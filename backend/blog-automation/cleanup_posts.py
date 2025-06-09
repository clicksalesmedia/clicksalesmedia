#!/usr/bin/env python3
"""
Cleanup script to fix language assignments for existing blog posts
"""

import os
import requests
import json
import re
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class BlogPostCleanup:
    def __init__(self):
        self.nextjs_api_url = os.getenv('NEXTJS_API_URL', 'https://clicksalesmedia.com/api')
    
    def detect_language(self, text: str) -> str:
        """Detect if text is primarily Arabic or English"""
        if not text:
            return "en"
            
        # Count Arabic characters vs Latin characters
        arabic_chars = sum(1 for char in text if '\u0600' <= char <= '\u06FF')
        latin_chars = sum(1 for char in text if char.isalpha() and char.isascii())
        
        # If more than 30% Arabic characters, consider it Arabic
        total_chars = arabic_chars + latin_chars
        if total_chars > 0 and (arabic_chars / total_chars) > 0.3:
            return "ar"
        else:
            return "en"
    
    def get_all_posts(self) -> List[Dict[str, Any]]:
        """Fetch all blog posts"""
        try:
            response = requests.get(f"{self.nextjs_api_url}/blog?published=true&limit=100")
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Error fetching posts: {response.status_code}")
                return []
        except Exception as e:
            print(f"Error fetching posts: {e}")
            return []
    
    def update_post_by_slug(self, slug: str, update_data: Dict[str, Any]) -> bool:
        """Update a blog post by slug"""
        try:
            response = requests.put(
                f"{self.nextjs_api_url}/blog/{slug}",
                json=update_data,
                headers={"Content-Type": "application/json"}
            )
            return response.status_code == 200
        except Exception as e:
            print(f"Error updating post {slug}: {e}")
            return False
    
    def cleanup_posts(self):
        """Main cleanup function"""
        posts = self.get_all_posts()
        fixed_count = 0
        
        print(f"🔍 Found {len(posts)} posts to analyze...")
        
        for post in posts:
            title = post.get('title', '')
            title_ar = post.get('titleAr')
            slug = post.get('slug')
            
            if not slug:
                continue
                
            # Detect actual language from title
            detected_language = self.detect_language(title)
            
            needs_update = False
            update_data = {}
            
            # Check if assignment is wrong
            if detected_language == "en" and title_ar:
                # English post incorrectly has Arabic fields
                print(f"❌ Fixing English post: {title}")
                update_data = {
                    "title": post.get('title'),
                    "slug": slug,
                    "content": post.get('content'),
                    "excerpt": post.get('excerpt'),
                    "coverImage": post.get('coverImage'),
                    "published": post.get('published', True),
                    "titleAr": None,
                    "contentAr": None,
                    "excerptAr": None,
                    "metaDescriptionAr": None,
                    "categories": post.get('categories', [])
                }
                needs_update = True
                
            elif detected_language == "ar" and not title_ar:
                # Arabic post missing Arabic fields
                print(f"❌ Fixing Arabic post: {title}")
                update_data = {
                    "title": post.get('title'),
                    "slug": slug,
                    "content": post.get('content'),
                    "excerpt": post.get('excerpt'),
                    "coverImage": post.get('coverImage'),
                    "published": post.get('published', True),
                    "titleAr": title,
                    "contentAr": post.get('content'),
                    "excerptAr": post.get('excerpt'),
                    "metaDescriptionAr": post.get('metaDescription', ''),
                    "categories": post.get('categories', [])
                }
                needs_update = True
            
            if needs_update:
                if self.update_post_by_slug(slug, update_data):
                    print(f"✅ Fixed post: {title}")
                    fixed_count += 1
                else:
                    print(f"❌ Failed to fix post: {title}")
            else:
                print(f"✅ Correct assignment: {title} ({detected_language})")
        
        print(f"\n🎉 Cleanup complete! Fixed {fixed_count} posts.")

def main():
    """Main function"""
    print("🧹 Blog Post Language Cleanup Tool")
    print("=" * 50)
    
    cleanup = BlogPostCleanup()
    cleanup.cleanup_posts()

if __name__ == "__main__":
    main() 