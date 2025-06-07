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
                model="o1-mini",  # Using o1-mini instead of o4-mini
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                # Note: o1-mini doesn't support response_format parameter
                # response_format={"type": "text"},
                # reasoning_effort="medium"  # Not supported in o1-mini
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
        lang_instruction = "in English" if language == "en" else "in Arabic"
        
        return f"""
Write a comprehensive blog post about "{topic}" {lang_instruction} for Click Sales Media, a digital marketing agency.

The blog post should be structured as follows:
1. Title: Catchy and SEO-optimized (60 characters max)
2. Meta Description: Compelling meta description (150 characters max)
3. Introduction: Hook the reader with a problem or interesting fact
4. Main Content: 800-1200 words with practical insights
5. How Click Sales Media Can Help: 2-3 paragraphs about our services
6. Conclusion: Call-to-action and summary
7. Tags: 5-7 relevant tags

Structure your response as JSON with these fields:
- title
- metaDescription
- content (in HTML format with proper headings)
- excerpt (first 150 words)
- tags (array of strings)
- category
- readingTime (estimated minutes)

Focus on:
- Actionable insights and tips
- Current trends and best practices
- Real-world examples
- How businesses can benefit
- Why they should choose Click Sales Media
- SEO optimization

Make it engaging, informative, and professional.
"""

    def _parse_blog_content(self, content: str, topic: str, language: str) -> Dict[str, Any]:
        """Parse the OpenAI response into structured blog data"""
        try:
            # Try to parse as JSON first
            if content.strip().startswith('{'):
                blog_data = json.loads(content)
            else:
                # If not JSON, create structure manually
                blog_data = {
                    "title": f"Master {topic}: Complete Guide for 2024",
                    "metaDescription": f"Discover expert {topic} strategies to boost your business. Learn from Click Sales Media's proven techniques.",
                    "content": content,
                    "excerpt": content[:150] + "...",
                    "tags": [topic.replace(" ", "").lower(), "digitalmarketing", "marketing", "business", "strategy"],
                    "category": "Digital Marketing",
                    "readingTime": len(content.split()) // 200 + 1
                }
            
            # Ensure required fields exist
            blog_data.setdefault('publishedAt', datetime.now().isoformat())
            blog_data.setdefault('language', language)
            blog_data.setdefault('status', 'published')
            blog_data.setdefault('featured', False)
            
            return blog_data
            
        except json.JSONDecodeError:
            logger.warning("Failed to parse JSON response, using fallback structure")
            return {
                "title": f"Master {topic}: Complete Guide for 2024",
                "metaDescription": f"Discover expert {topic} strategies to boost your business.",
                "content": content,
                "excerpt": content[:150] + "...",
                "tags": [topic.replace(" ", "").lower(), "digitalmarketing"],
                "category": "Digital Marketing",
                "readingTime": len(content.split()) // 200 + 1,
                "publishedAt": datetime.now().isoformat(),
                "language": language,
                "status": "published",
                "featured": False
            }

    def _generate_image(self, title: str) -> str:
        """Generate image using OpenAI DALL-E"""
        try:
            logger.info(f"Generating image for: {title}")
            
            prompt = f"""
Create a professional, modern blog header image for "{title}".
Style: Clean, minimalist, corporate
Colors: Professional blues, whites, and accent colors
Elements: Abstract marketing icons, charts, digital elements
No text overlay, high quality, suitable for blog header
"""
            
            response = self.client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1792x1024",
                quality="standard",
                n=1
            )
            
            image_url = response.data[0].url
            logger.info("Successfully generated image")
            return image_url
            
        except Exception as e:
            logger.error(f"Error generating image: {str(e)}")
            # Fallback to a placeholder image
            return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1792&h=1024&fit=crop"

    def publish_to_nextjs(self, blog_data: Dict[str, Any]) -> bool:
        """Publish blog post to Next.js API"""
        try:
            logger.info(f"Publishing blog post: {blog_data['title']}")
            
            # Prepare data for Next.js API
            post_data = {
                "title": blog_data["title"],
                "content": blog_data["content"],
                "excerpt": f"AI Generated - {blog_data['excerpt']}",  # Add AI Generated tag
                "coverImage": blog_data["image"],
                "published": True,
                "authorId": "admin_user_id"  # Will need to be updated with actual admin ID
            }
            
            # Add Arabic fields if language is Arabic
            if blog_data["language"] == "ar":
                post_data.update({
                    "titleAr": blog_data["title"],
                    "contentAr": blog_data["content"],
                    "excerptAr": blog_data["excerpt"],
                    "metaDescriptionAr": blog_data["metaDescription"]
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