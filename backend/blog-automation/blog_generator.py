import os
import json
import random
import logging
from datetime import datetime, timedelta
from typing import List, Dict, Any
from dotenv import load_dotenv
from openai import OpenAI
import requests
from PIL import Image
from io import BytesIO
import base64
import re

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=getattr(logging, os.getenv('LOG_LEVEL', 'INFO')),
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('blog_automation.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class BlogGenerator:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.nextjs_api_url = os.getenv('NEXTJS_API_URL', 'https://clicksalesmedia.com/api')
        self.posts_per_day = int(os.getenv('POSTS_PER_DAY', '2'))
        self.languages = os.getenv('LANGUAGES', 'en,ar').split(',')
        
        # Marketing topics for blog posts
        self.topics = [
            "AI Marketing",
            "SEO Optimization", 
            "Performance Marketing",
            "PPC Advertising",
            "Social Media Marketing",
            "Email Marketing",
            "E-commerce Marketing",
            "Content Marketing",
            "Conversion Rate Optimization",
            "Marketing Analytics",
            "Brand Strategy",
            "Digital Transformation",
            "Marketing Automation",
            "Influencer Marketing",
            "Video Marketing",
            "Mobile Marketing",
            "Local SEO",
            "Google Ads",
            "Facebook Advertising",
            "LinkedIn Marketing",
            "Instagram Marketing",
            "TikTok Marketing",
            "YouTube Marketing",
            "Programmatic Advertising",
            "Retargeting Campaigns"
        ]
        
        # Industry-specific topics
        self.industries = [
            "Healthcare Marketing",
            "Real Estate Marketing", 
            "E-commerce Marketing",
            "SaaS Marketing",
            "Finance Marketing",
            "Education Marketing",
            "Hospitality Marketing",
            "Automotive Marketing",
            "Fashion Marketing",
            "Technology Marketing",
            "Food & Beverage Marketing",
            "Travel Marketing",
            "Fitness Marketing",
            "Beauty Marketing",
            "Legal Marketing"
        ]

    def generate_blog_post(self, topic: str, language: str) -> Dict[str, Any]:
        """Generate a blog post using OpenAI API"""
        try:
            logger.info(f"Generating blog post for topic: {topic} in {language}")
            
            prompt = self._create_prompt(topic, language)
            
            response = self.client.chat.completions.create(
                model="o4-mini",
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )
            
            content = response.choices[0].message.content
            
            # Parse the structured response
            blog_data = self._parse_blog_content(content, topic, language)
            
            # Generate image for the post
            image_url = self._generate_image(blog_data['title'])
            blog_data['image'] = image_url
            
            logger.info(f"Successfully generated blog post: {blog_data['title']}")
            return blog_data
            
        except Exception as e:
            logger.error(f"Error generating blog post: {str(e)}")
            raise

    def _create_prompt(self, topic: str, language: str) -> str:
        """Create prompt for OpenAI API"""
        current_year = datetime.now().year
        lang_instruction = "in English" if language == "en" else "in Arabic"
        
        return f"""
Write a comprehensive, professional blog post about "{topic}" {lang_instruction} for Click Sales Media, a digital marketing agency.

IMPORTANT: Respond with ONLY valid JSON. No additional text, explanations, or formatting outside the JSON.

The blog post should be for {current_year} and include current trends and best practices.

Structure your response as a single JSON object with these exact fields:
{{
  "title": "Catchy and SEO-optimized title (60 characters max, no JSON or code formatting)",
  "metaDescription": "Compelling meta description (150 characters max)",
  "content": "Full blog post content in HTML format with proper headings (800-1200 words)",
  "excerpt": "Engaging introduction excerpt (150 words max)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "category": "Digital Marketing",
  "readingTime": 5
}}

Focus on:
- Actionable insights and tips for {current_year}
- Current trends and best practices
- Real-world examples
- How businesses can benefit
- Why they should choose Click Sales Media
- SEO optimization
- Clean, professional titles without JSON formatting

Make it engaging, informative, and professional for {current_year}.
"""

    def _parse_blog_content(self, content: str, topic: str, language: str) -> Dict[str, Any]:
        """Parse the OpenAI response into structured blog data"""
        try:
            # Clean the content first
            content = content.strip()
            
            # Remove any markdown code blocks if present
            content = re.sub(r'```json\s*', '', content)
            content = re.sub(r'\s*```', '', content)
            
            # Try to find JSON content
            json_match = re.search(r'\{.*\}', content, re.DOTALL)
            if json_match:
                json_content = json_match.group(0)
            else:
                json_content = content
            
            # Parse JSON
            blog_data = json.loads(json_content)
            
            # Clean the title to remove any JSON artifacts
            if 'title' in blog_data:
                blog_data['title'] = re.sub(r'```json|```|{|}|"title":|"', '', str(blog_data['title'])).strip()
                blog_data['title'] = blog_data['title'].replace('\\n', ' ').replace('\\', '')
                # Update year to 2025
                blog_data['title'] = blog_data['title'].replace('2024', '2025')
            
            # Ensure required fields exist with proper values
            current_year = datetime.now().year
            blog_data.setdefault('publishedAt', datetime.now().isoformat())
            blog_data.setdefault('language', language)
            blog_data.setdefault('status', 'published')
            blog_data.setdefault('featured', False)
            
            # Update any 2024 references to current year
            for key in ['title', 'content', 'metaDescription', 'excerpt']:
                if key in blog_data and isinstance(blog_data[key], str):
                    blog_data[key] = blog_data[key].replace('2024', str(current_year))
            
            return blog_data
            
        except (json.JSONDecodeError, AttributeError) as e:
            logger.warning(f"Failed to parse JSON response: {e}, using fallback structure")
            current_year = datetime.now().year
            clean_topic = topic.replace('2024', str(current_year))
            
            return {
                "title": f"Master {clean_topic}: Complete Guide for {current_year}",
                "metaDescription": f"Discover expert {clean_topic} strategies to boost your business with Click Sales Media's proven techniques for {current_year}.",
                "content": f"<h1>Master {clean_topic}: Complete Guide for {current_year}</h1><p>In the rapidly evolving digital landscape of {current_year}, {clean_topic.lower()} has become more crucial than ever for businesses looking to thrive online...</p>",
                "excerpt": f"In the rapidly evolving digital landscape of {current_year}, {clean_topic.lower()} has become more crucial than ever for businesses looking to thrive online. This comprehensive guide will walk you through the latest strategies and best practices.",
                "tags": [clean_topic.replace(" ", "").lower(), "digitalmarketing", "marketing", "business", f"strategy{current_year}"],
                "category": "Digital Marketing",
                "readingTime": 6,
                "publishedAt": datetime.now().isoformat(),
                "language": language,
                "status": "published",
                "featured": False
            }

    def _generate_image(self, title: str) -> str:
        """Generate image using gpt-image-1"""
        try:
            logger.info(f"Generating image for: {title}")
            
            # Create a professional image prompt based on the title
            # Remove any numbers, special characters, and make it professional
            clean_title = re.sub(r'\d{4}', '', title)  # Remove years
            clean_title = re.sub(r'[^\w\s]', '', clean_title)  # Remove special chars
            
            prompt = f"""
Create a professional, modern digital marketing illustration for an article about {clean_title}.

The image should be:
- Clean, professional business style
- Digital marketing theme with modern elements
- Corporate color scheme (blues, whites, grays)
- High quality, crisp design
- Include elements like charts, graphs, digital icons
- Professional office or digital workspace setting
- No text overlays
- 16:9 aspect ratio
- High resolution

Style: Corporate, professional, modern, clean
"""
            
            response = self.client.images.generate(
                model="gpt-image-1",
                prompt=prompt,
                size="1536x1024",
                quality="high",
                n=1,
            )
            
            image_url = response.data[0].url
            logger.info(f"Successfully generated image: {image_url}")
            return image_url
            
        except Exception as e:
            logger.error(f"Error generating image with gpt-image-1: {str(e)}")
            # Fallback to a high-quality professional placeholder
            return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1792&h=1024&fit=crop&auto=format&q=80"

    def _detect_language(self, text: str) -> str:
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

    def publish_to_nextjs(self, blog_data: Dict[str, Any]) -> bool:
        """Publish blog post to Next.js API"""
        try:
            logger.info(f"Publishing blog post: {blog_data['title']}")
            
            # Detect actual language from content
            detected_language = self._detect_language(blog_data['title'])
            blog_data['language'] = detected_language
            
            # Generate clean slug from title
            title_for_slug = blog_data["title"].lower()
            # Remove special characters and normalize
            slug = re.sub(r'[^\w\s-]', '', title_for_slug)
            slug = re.sub(r'[\s_-]+', '-', slug)
            slug = slug.strip('-')[:100]  # Limit length and remove leading/trailing dashes
            
            # Prepare data for Next.js API
            post_data = {
                "title": blog_data["title"],
                "slug": slug,
                "content": blog_data["content"],
                "excerpt": blog_data['excerpt'],  # Remove AI Generated prefix for cleaner look
                "coverImage": blog_data["image"],
                "published": True,
                "authorId": "cmbmdeprt000081y34rklazoj"  # Server admin user ID
            }
            
            # Only add Arabic fields if the content is actually Arabic
            if detected_language == "ar":
                post_data.update({
                    "titleAr": blog_data["title"],
                    "contentAr": blog_data["content"],
                    "excerptAr": blog_data["excerpt"],
                    "metaDescriptionAr": blog_data.get("metaDescription", "")
                })
            else:
                # For English posts, explicitly set Arabic fields to null
                post_data.update({
                    "titleAr": None,
                    "contentAr": None,
                    "excerptAr": None,
                    "metaDescriptionAr": None
                })
            
            # Send to Next.js API
            response = requests.post(
                f"{self.nextjs_api_url}/blog",
                json=post_data,
                headers={"Content-Type": "application/json"},
                timeout=30
            )
            
            if response.status_code == 201:
                logger.info("Successfully published blog post to Next.js")
                return True
            else:
                logger.error(f"Failed to publish blog post: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            logger.error(f"Error publishing to Next.js: {str(e)}")
            return False

    def generate_daily_posts(self) -> List[Dict[str, Any]]:
        """Generate daily blog posts"""
        posts = []
        
        try:
            logger.info("Starting daily blog post generation")
            
            # Select random topics
            selected_topics = random.sample(
                self.topics + self.industries, 
                self.posts_per_day
            )
            
            for i, topic in enumerate(selected_topics):
                # Alternate between languages
                language = self.languages[i % len(self.languages)]
                
                # Generate blog post
                blog_post = self.generate_blog_post(topic, language)
                posts.append(blog_post)
                
                # Publish to Next.js
                success = self.publish_to_nextjs(blog_post)
                blog_post['published_success'] = success
                
                logger.info(f"Generated post {i+1}/{self.posts_per_day}: {blog_post['title']}")
            
            logger.info(f"Successfully generated {len(posts)} blog posts")
            return posts
            
        except Exception as e:
            logger.error(f"Error in daily post generation: {str(e)}")
            raise

    def save_generation_log(self, posts: List[Dict[str, Any]]):
        """Save generation log for tracking"""
        log_data = {
            "timestamp": datetime.now().isoformat(),
            "posts_generated": len(posts),
            "posts": [
                {
                    "title": post["title"],
                    "language": post["language"],
                    "published_success": post.get("published_success", False)
                }
                for post in posts
            ]
        }
        
        # Save to log file
        log_filename = f"generation_log_{datetime.now().strftime('%Y%m%d')}.json"
        with open(log_filename, 'w', encoding='utf-8') as f:
            json.dump(log_data, f, indent=2, ensure_ascii=False)
        
        logger.info(f"Generation log saved to {log_filename}")

def main():
    """Main function to run the blog generator"""
    try:
        generator = BlogGenerator()
        posts = generator.generate_daily_posts()
        generator.save_generation_log(posts)
        
        print(f"✅ Successfully generated {len(posts)} blog posts")
        for post in posts:
            status = "✅ Published" if post.get('published_success') else "❌ Failed"
            print(f"   - {post['title']} ({post['language']}) - {status}")
            
    except Exception as e:
        logger.error(f"Fatal error in main execution: {str(e)}")
        print(f"❌ Error: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main() 