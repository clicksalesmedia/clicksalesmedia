#!/usr/bin/env python3
"""
Main entry point for Click Sales Media Blog Automation
Uses the enhanced blog generator with o4-mini
"""

from blog_generator_enhanced import EnhancedBlogGenerator
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def main():
    """Main function to run the enhanced blog automation"""
    try:
        print("🚀 Click Sales Media - Enhanced Blog Automation with o4-mini")
        print("=" * 60)
        
        generator = EnhancedBlogGenerator()
        posts = generator.generate_daily_posts()
        
        # Save generation log
        generator.save_generation_log(posts)
        
        # Print summary
        print(f"\n🎉 Generation Complete!")
        print(f"📊 Posts Generated: {len(posts)}")
        print("\n📝 Generated Posts:")
        
        for i, post in enumerate(posts, 1):
            status = "✅ Published" if post.get('published_success') else "❌ Failed"
            print(f"   {i}. {post['title']}")
            print(f"      Category: {post['category']} | Language: {post['language']} | {status}")
            
    except Exception as e:
        logging.error(f"💥 Fatal error in main execution: {str(e)}")
        print(f"❌ Error: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main()
