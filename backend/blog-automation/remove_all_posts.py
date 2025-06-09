#!/usr/bin/env python3
"""
Script to remove all blog posts from the database
"""

import os
import requests
import json
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class BlogPostRemover:
    def __init__(self):
        self.nextjs_api_url = os.getenv('NEXTJS_API_URL', 'https://clicksalesmedia.com/api')
    
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
    
    def delete_post(self, slug: str) -> bool:
        """Delete a blog post by slug"""
        try:
            response = requests.delete(f"{self.nextjs_api_url}/blog/{slug}")
            return response.status_code == 200
        except Exception as e:
            print(f"Error deleting post {slug}: {e}")
            return False
    
    def remove_all_posts(self):
        """Remove all blog posts"""
        posts = self.get_all_posts()
        
        if not posts:
            print("ℹ️  No posts found to remove.")
            return
            
        print(f"🗑️  Found {len(posts)} posts to remove...")
        
        removed_count = 0
        failed_count = 0
        
        for post in posts:
            slug = post.get('slug')
            title = post.get('title', 'Unknown')
            
            if not slug:
                print(f"❌ No slug found for post: {title}")
                failed_count += 1
                continue
            
            print(f"🗑️  Removing: {title}")
            
            if self.delete_post(slug):
                print(f"✅ Removed: {title}")
                removed_count += 1
            else:
                print(f"❌ Failed to remove: {title}")
                failed_count += 1
        
        print(f"\n🎉 Cleanup Summary:")
        print(f"✅ Successfully removed: {removed_count} posts")
        print(f"❌ Failed to remove: {failed_count} posts")

def main():
    """Main function"""
    print("🗑️  Blog Post Removal Tool")
    print("=" * 50)
    
    confirm = input("⚠️  Are you sure you want to remove ALL blog posts? (yes/no): ")
    if confirm.lower() != 'yes':
        print("❌ Operation cancelled.")
        return
    
    remover = BlogPostRemover()
    remover.remove_all_posts()

if __name__ == "__main__":
    main() 