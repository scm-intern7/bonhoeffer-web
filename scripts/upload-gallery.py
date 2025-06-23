#!/usr/bin/env python3
import os
import subprocess
import json
import glob
import re

def upload_gallery_images():
    # Set working directory
    os.chdir('/Users/nakul/Desktop/Internal Tool BM/website/frontend')
    
    # Load environment variable
    env = os.environ.copy()
    try:
        with open('.env.local', 'r') as f:
            for line in f:
                if line.strip() and not line.startswith('#'):
                    key, value = line.strip().split('=', 1)
                    env[key] = value
    except:
        print("Could not load .env.local")
    
    # Find all gallery images
    image_patterns = ['public/gallery/*.jpg', 'public/gallery/*.jpeg', 'public/gallery/*.png', 'public/gallery/*.webp', 'public/gallery/*.gif']
    image_files = []
    for pattern in image_patterns:
        image_files.extend(glob.glob(pattern))
    
    print(f"Found {len(image_files)} images to upload")
    
    uploaded_urls = {}
    
    for i, filepath in enumerate(image_files, 1):
        filename = os.path.basename(filepath)
        print(f"[{i}/{len(image_files)}] Uploading: {filename}")
        
        try:
            # Run vercel blob put command
            cmd = [
                'vercel', 'blob', 'put', filepath, 
                '--rw-token', env.get('BLOB_READ_WRITE_TOKEN', ''),
                '--force',
                '--pathname', f'gallery/{filename}'
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True, env=env)
            
            if result.returncode == 0:
                # Extract URL from output
                url_match = re.search(r'https://[^\s]+', result.stdout)
                if url_match:
                    url = url_match.group(0)
                    uploaded_urls[filename] = url
                    print(f"✓ {filename} -> {url}")
                else:
                    print(f"✗ {filename} - No URL found in output")
                    print(f"Output: {result.stdout}")
            else:
                print(f"✗ {filename} - Command failed")
                print(f"Error: {result.stderr}")
                
        except Exception as e:
            print(f"✗ {filename} - Exception: {e}")
        
        # Small delay to avoid rate limiting
        if i % 10 == 0:
            print(f"Processed {i} images... pausing briefly")
            import time
            time.sleep(2)
    
    # Save URLs to JSON file
    with open('public/gallery-urls.json', 'w') as f:
        json.dump(uploaded_urls, f, indent=2)
    
    print(f"\n✅ Upload complete!")
    print(f"📊 Successfully uploaded: {len(uploaded_urls)} out of {len(image_files)} images")
    print(f"📄 URLs saved to: public/gallery-urls.json")
    
    return uploaded_urls

if __name__ == "__main__":
    upload_gallery_images()
