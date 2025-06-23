import { put } from '@vercel/blob';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

// Set the Blob token from environment
process.env.BLOB_READ_WRITE_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || 'vercel_blob_rw_9LHI1AprmhE38ImG_CVoS4wyCbADEnMxZSmJjddIg1tZAyQ';

const galleryDir = 'public/gallery';

async function uploadGalleryImages() {
  try {
    console.log('Starting gallery image upload...');
    console.log('Blob token available:', !!process.env.BLOB_READ_WRITE_TOKEN);
    
    // Read all files in the gallery directory
    const files = await readdir(galleryDir);
    console.log('Found files:', files.length);
    
    const imageFiles = files.filter(file => 
      file.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif)$/i)
    );

    console.log(`Found ${imageFiles.length} images to upload...`);

    const uploadedImages = [];

    for (const file of imageFiles) {
      try {
        const filePath = join(galleryDir, file);
        const fileBuffer = await readFile(filePath);
        
        console.log(`Uploading ${file}...`);
        
        // Upload to Vercel Blob
        const blob = await put(`gallery/${file}`, fileBuffer, {
          access: 'public'
        });

        uploadedImages.push({
          filename: file,
          url: blob.url,
          size: fileBuffer.length
        });

        console.log(`✅ Uploaded ${file} -> ${blob.url}`);
      } catch (error) {
        console.error(`❌ Error uploading ${file}:`, error.message);
      }
    }

    // Save the uploaded images info to a JSON file
    const outputPath = 'public/gallery-images.json';
    await import('fs/promises').then(fs => 
      fs.writeFile(outputPath, JSON.stringify(uploadedImages, null, 2))
    );

    console.log(`\n✅ Upload complete! ${uploadedImages.length} images uploaded.`);
    console.log(`📄 Image URLs saved to: ${outputPath}`);
    
    return uploadedImages;
  } catch (error) {
    console.error('Error uploading gallery images:', error);
    throw error;
  }
}

// Run the upload if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  uploadGalleryImages()
    .then(() => {
      console.log('Gallery upload completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Gallery upload failed:', error);
      process.exit(1);
    });
}

export { uploadGalleryImages };
