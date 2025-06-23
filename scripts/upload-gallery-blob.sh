#!/bin/bash

# Script to upload all gallery images to Vercel Blob and save URLs

# Create output file for URLs
output_file="gallery-blob-urls.json"
echo "{" > $output_file

# Counter for comma placement
counter=0

# Find all image files in public/gallery
find public/gallery -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" \) | while read file; do
    echo "Uploading: $file"
    
    # Extract filename without path
    filename=$(basename "$file")
    
    # Upload to Vercel Blob and capture URL
    url=$(vercel blob put "$file" --token="$BLOB_READ_WRITE_TOKEN" 2>/dev/null | grep -o 'https://[^"]*')
    
    if [ ! -z "$url" ]; then
        # Add comma if not first entry
        if [ $counter -gt 0 ]; then
            echo "," >> $output_file
        fi
        
        # Add entry to output file
        echo -n "  \"$filename\": \"$url\"" >> $output_file
        echo "✓ Uploaded: $filename -> $url"
        
        counter=$((counter + 1))
    else
        echo "✗ Failed to upload: $file"
    fi
done

echo "" >> $output_file
echo "}" >> $output_file

echo "Upload complete! URLs saved to $output_file"
