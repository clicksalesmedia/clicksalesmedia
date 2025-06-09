#!/usr/bin/env python3
"""
Test script to verify blog automation fixes
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from blog_generator import BlogGenerator
import json
from datetime import datetime

def test_title_cleaning():
    """Test that titles are cleaned properly"""
    print("🧪 Testing title cleaning...")
    
    generator = BlogGenerator()
    
    # Test cases with problematic titles
    test_cases = [
        'Master Digital Transformation: Complete Guide for 2024\nAI Generated - ```json { "title": "تحول رقمي ناجح: دليل الشركات للتميز"',
        '```json\n{"title": "Digital Marketing 2024"}```',
        'AI Generated - Master SEO: Complete Guide for 2024',
        '{"title": "Social Media Marketing 2024"}'
    ]
    
    for i, test_content in enumerate(test_cases):
        print(f"\nTest case {i+1}: {test_content[:50]}...")
        try:
            blog_data = generator._parse_blog_content(test_content, "Digital Marketing", "en")
            print(f"✅ Cleaned title: {blog_data['title']}")
            print(f"✅ Year updated: {'2025' in blog_data['title']}")
        except Exception as e:
            print(f"❌ Error: {e}")

def test_year_updates():
    """Test that 2024 is properly updated to current year"""
    print("\n🧪 Testing year updates...")
    
    generator = BlogGenerator()
    current_year = datetime.now().year
    
    test_content = '''
    {
        "title": "Digital Marketing Trends for 2024",
        "content": "In 2024, businesses need to focus on AI and automation.",
        "metaDescription": "Top digital marketing trends for 2024 success.",
        "excerpt": "Learn about the most important marketing trends of 2024."
    }
    '''
    
    blog_data = generator._parse_blog_content(test_content, "Digital Marketing", "en")
    
    print(f"Title: {blog_data['title']}")
    print(f"Content contains {current_year}: {str(current_year) in blog_data['content']}")
    print(f"Meta description updated: {str(current_year) in blog_data['metaDescription']}")
    print(f"Excerpt updated: {str(current_year) in blog_data['excerpt']}")

def test_prompt_generation():
    """Test that prompts are generated correctly"""
    print("\n🧪 Testing prompt generation...")
    
    generator = BlogGenerator()
    current_year = datetime.now().year
    
    prompt = generator._create_prompt("AI Marketing", "en")
    
    print(f"Prompt includes current year ({current_year}): {str(current_year) in prompt}")
    print(f"Prompt includes JSON structure: {'JSON object' in prompt}")
    print(f"Prompt includes clean title instruction: {'no JSON or code formatting' in prompt}")

def test_slug_generation():
    """Test slug generation"""
    print("\n🧪 Testing slug generation...")
    
    import re
    
    test_titles = [
        "Master AI Marketing: Complete Guide for 2025",
        "SEO Optimization & Best Practices!",
        "What is Digital Marketing? A Guide",
        "E-commerce Marketing (Advanced Strategies)"
    ]
    
    for title in test_titles:
        # Simulate the slug generation logic
        title_for_slug = title.lower()
        slug = re.sub(r'[^\w\s-]', '', title_for_slug)
        slug = re.sub(r'[\s_-]+', '-', slug)
        slug = slug.strip('-')[:100]
        
        print(f"Title: {title}")
        print(f"Slug: {slug}")
        print()

if __name__ == "__main__":
    print("🚀 Click Sales Media - Blog Automation Test Suite")
    print("=" * 60)
    
    try:
        test_title_cleaning()
        test_year_updates()
        test_prompt_generation()
        test_slug_generation()
        
        print("\n🎉 All tests completed!")
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc() 