#!/usr/bin/env python3
"""
Script to create iOS app icons from a source image.
Place your pig icon as 'source_icon.png' in this directory and run this script.
"""

from PIL import Image
import os

def create_ios_icons():
    # Check if source image exists
    source_path = 'source_icon.png'
    if not os.path.exists(source_path):
        print(f"Error: {source_path} not found!")
        print("Please place your pig icon as 'source_icon.png' in this directory.")
        return
    
    # Load the source image
    try:
        source_img = Image.open(source_path)
        print(f"Loaded source image: {source_img.size}")
    except Exception as e:
        print(f"Error loading image: {e}")
        return
    
    # Create 120x120 icon (required for iOS)
    icon_120 = source_img.resize((120, 120), Image.Resampling.LANCZOS)
    icon_120.save('AppIcon-120.png')
    print("Created AppIcon-120.png (120x120)")
    
    # Create other common sizes for completeness
    sizes = [
        (40, 'AppIcon-40.png'),
        (58, 'AppIcon-58.png'),
        (60, 'AppIcon-60.png'),
        (80, 'AppIcon-80.png'),
        (87, 'AppIcon-87.png'),
        (114, 'AppIcon-114.png'),
        (120, 'AppIcon-120.png'),
        (180, 'AppIcon-180.png'),
        (1024, 'AppIcon-1024.png')
    ]
    
    for size, filename in sizes:
        if filename != 'AppIcon-120.png':  # Already created
            resized = source_img.resize((size, size), Image.Resampling.LANCZOS)
            resized.save(filename)
            print(f"Created {filename} ({size}x{size})")
    
    print("\nAll icons created successfully!")
    print("You can now build your iOS app.")

if __name__ == "__main__":
    create_ios_icons()
