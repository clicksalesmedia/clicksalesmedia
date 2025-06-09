#!/usr/bin/env python3
"""
Test script to generate a new blog post with improved language detection
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from blog_generator_enhanced import EnhancedBlogGenerator
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)

def test_arabic_post():
    """Test generating an Arabic blog post"""
    print("🧪 Testing Arabic Blog Post Generation")
    print("=" * 50)
    
    generator = EnhancedBlogGenerator()
    
    # Generate Arabic post
    topic = "التسويق الرقمي بالذكاء الاصطناعي"
    category = "AI Marketing"
    language = "ar"
    
    try:
        blog_post = generator.generate_blog_post(topic, category, language)
        print(f"✅ Generated Arabic post: {blog_post['title']}")
        print(f"📝 Language detected: {generator._detect_language(blog_post['title'])}")
        
        # Publish the post
        success = generator.publish_to_nextjs(blog_post)
        if success:
            print("✅ Successfully published Arabic post!")
        else:
            print("❌ Failed to publish Arabic post")
            
    except Exception as e:
        print(f"❌ Error generating Arabic post: {e}")

def test_english_post():
    """Test generating an English blog post"""
    print("\n🧪 Testing English Blog Post Generation")
    print("=" * 50)
    
    generator = EnhancedBlogGenerator()
    
    # Generate English post
    topic = "AI-Powered Marketing Automation"
    category = "AI Marketing"
    language = "en"
    
    try:
        blog_post = generator.generate_blog_post(topic, category, language)
        print(f"✅ Generated English post: {blog_post['title']}")
        print(f"📝 Language detected: {generator._detect_language(blog_post['title'])}")
        
        # Publish the post
        success = generator.publish_to_nextjs(blog_post)
        if success:
            print("✅ Successfully published English post!")
        else:
            print("❌ Failed to publish English post")
            
    except Exception as e:
        print(f"❌ Error generating English post: {e}")

def main():
    """Main test function"""
    print("🚀 Blog Automation Test Suite")
    print("Testing improved language detection and image generation")
    print("=" * 60)
    
    # Test both languages
    test_english_post()
    test_arabic_post()
    
    print("\n🎉 Test completed!")

if __name__ == "__main__":
    main() 