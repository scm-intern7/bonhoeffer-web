#!/bin/bash

# Script to upload all gallery images to Vercel Blob and capture URLs

cd /Users/nakul/Desktop/Internal\ Tool\ BM/website/frontend
source .env.local

echo "Starting gallery upload process..."
echo "{" > gallery-blob-urls.json

first_entry=true

# Find all image files and upload them
find public/gallery -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.webp" -o -iname "*.gif" \) | while read -r file; do
    filename=$(basename "$file")
    echo "Uploading: $filename"
    
    # Upload to Vercel Blob with force flag
    result=$(vercel blob put "$file" --rw-token="$BLOB_READ_WRITE_TOKEN" --force --pathname="gallery/$filename" 2>&1)
    
    # Extract URL from the result
    url=$(echo "$result" | grep -o 'https://[^[:space:]]*')
    
    if [ -n "$url" ]; then
        # Read current content, remove last }, add new entry, close }
        if [ "$first_entry" = true ]; then
            echo "  \"$filename\": \"$url\"" >> gallery-blob-urls.json
            first_entry=false
        else
            # Remove last } and add comma + new entry
            sed -i '' '$ s/}//' gallery-blob-urls.json
            echo "," >> gallery-blob-urls.json
            echo "  \"$filename\": \"$url\"" >> gallery-blob-urls.json
        fi
        
        echo "✓ $filename -> $url"
    else
        echo "✗ Failed to upload: $filename"
        echo "Error output: $result"
    fi
done

echo "}" >> gallery-blob-urls.json
echo "Upload process completed!"
