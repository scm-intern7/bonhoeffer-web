import { exec } from 'child_process';
import { promisify } from 'util';
import { readdir } from 'fs/promises';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const execAsync = promisify(exec);

async function uploadAllGalleryImages() {
  try {
    console.log('Starting upload of all gallery images...');
    
    // Get all image files
    const files = await readdir('public/gallery');
    const imageFiles = files.filter(file => 
      file.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif)$/i)
    );
    
    console.log(`Found ${imageFiles.length} images to upload`);
    
    const uploadedUrls = {};
    let successCount = 0;
    let failCount = 0;
    
    // Upload images in batches of 5 to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < imageFiles.length; i += batchSize) {
      const batch = imageFiles.slice(i, i + batchSize);
      
      console.log(`\nProcessing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(imageFiles.length/batchSize)}...`);
      
      const batchPromises = batch.map(async (filename) => {
        try {
          const filePath = join('public/gallery', filename);
          const command = `vercel blob put "${filePath}" --rw-token="$BLOB_READ_WRITE_TOKEN" --force --pathname="gallery/${filename}"`;
          
          const { stdout, stderr } = await execAsync(command, {
            env: { ...process.env, BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN }
          });
          
          // Extract URL from output
          const urlMatch = stdout.match(/https:\/\/[^\s]+/);
          if (urlMatch) {
            uploadedUrls[filename] = urlMatch[0];
            console.log(`✓ ${filename}`);
            return { filename, success: true, url: urlMatch[0] };
          } else {
            console.log(`✗ ${filename} - No URL found in output`);
            return { filename, success: false, error: 'No URL in output' };
          }
        } catch (error) {
          console.log(`✗ ${filename} - ${error.message}`);
          return { filename, success: false, error: error.message };
        }
      });
      
      const batchResults = await Promise.all(batchPromises);
      batchResults.forEach(result => {
        if (result.success) {
          successCount++;
        } else {
          failCount++;
        }
      });
      
      // Small delay between batches
      if (i + batchSize < imageFiles.length) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Save URLs to JSON file
    await writeFile('public/gallery-urls.json', JSON.stringify(uploadedUrls, null, 2));
    
    console.log(`\n✅ Upload complete!`);
    console.log(`📊 Success: ${successCount}, Failed: ${failCount}, Total: ${imageFiles.length}`);
    console.log(`📄 URLs saved to: public/gallery-urls.json`);
    
    return uploadedUrls;
  } catch (error) {
    console.error('Error in upload process:', error);
    throw error;
  }
}

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Run the upload
uploadAllGalleryImages()
  .then(() => {
    console.log('All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Upload failed:', error);
    process.exit(1);
  });
