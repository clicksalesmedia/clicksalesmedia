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

class EnhancedBlogGenerator:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        self.nextjs_api_url = os.getenv('NEXTJS_API_URL', 'https://clicksalesmedia.com/api')
        self.posts_per_day = int(os.getenv('POSTS_PER_DAY', '2'))
        self.languages = os.getenv('LANGUAGES', 'en,ar').split(',')
        
        # Your existing categories from the database
        self.categories = {
            "AI Marketing": "ai-marketing",
            "B2B": "b2b", 
            "Ecommerce": "ecommerce",
            "Performance Marketing": "performance-marketing",
            "PPC Ads": "ppc-ads",
            "Social Media": "social-media"
        }
        
        # Enhanced marketing topics mapped to your categories
        self.topic_category_map = {
            # AI Marketing topics
            "AI-Powered Marketing Strategies": "AI Marketing",
            "Machine Learning in Digital Marketing": "AI Marketing", 
            "AI Chatbots for Customer Engagement": "AI Marketing",
            "Automated Content Creation with AI": "AI Marketing",
            "AI Analytics for Marketing Optimization": "AI Marketing",
            
            # B2B topics
            "B2B Lead Generation Strategies": "B2B",
            "Account-Based Marketing for B2B": "B2B",
            "B2B Content Marketing Best Practices": "B2B",
            "LinkedIn Marketing for B2B Companies": "B2B",
            "B2B Sales Funnel Optimization": "B2B",
            
            # Ecommerce topics
            "E-commerce Conversion Rate Optimization": "Ecommerce",
            "Online Store SEO Strategies": "Ecommerce",
            "E-commerce Email Marketing": "Ecommerce",
            "Product Photography for Online Stores": "Ecommerce",
            "E-commerce Mobile Optimization": "Ecommerce",
            "Abandoned Cart Recovery Strategies": "Ecommerce",
            
            # Performance Marketing topics
            "ROI-Focused Marketing Campaigns": "Performance Marketing",
            "Data-Driven Marketing Strategies": "Performance Marketing",
            "Marketing Attribution Models": "Performance Marketing",
            "Performance Marketing KPIs": "Performance Marketing",
            "Conversion Tracking and Analysis": "Performance Marketing",
            
            # PPC Ads topics
            "Google Ads Optimization Strategies": "PPC Ads",
            "Facebook Ads Campaign Management": "PPC Ads",
            "PPC Keyword Research Techniques": "PPC Ads",
            "Display Advertising Best Practices": "PPC Ads",
            "YouTube Ads for Business Growth": "PPC Ads",
            "Retargeting Campaigns Strategy": "PPC Ads",
            
            # Social Media topics
            "Instagram Marketing for Businesses": "Social Media",
            "TikTok Marketing Strategies": "Social Media",
            "Twitter Marketing Best Practices": "Social Media",
            "Social Media Content Calendar": "Social Media",
            "Influencer Marketing Campaigns": "Social Media",
            "Social Media Analytics and Reporting": "Social Media"
        }
        
        # Industry-specific topics (will use most relevant category)
        self.industry_topics = {
            "Healthcare Digital Marketing": "B2B",
            "Real Estate Marketing Strategies": "B2B", 
            "SaaS Marketing Best Practices": "B2B",
            "Finance Marketing Compliance": "B2B",
            "Education Marketing Trends": "B2B",
            "Hospitality Digital Marketing": "Ecommerce",
            "Automotive Marketing Strategies": "Performance Marketing",
            "Fashion E-commerce Marketing": "Ecommerce",
            "Technology B2B Marketing": "B2B",
            "Food & Beverage Social Marketing": "Social Media"
        }

    def generate_blog_post(self, topic: str, category: str, language: str) -> Dict[str, Any]:
        """Generate a comprehensive blog post using OpenAI o4-mini"""
        try:
            logger.info(f"Generating blog post for topic: {topic} in {language}")
            
            current_year = datetime.now().year
            lang_instruction = "in English" if language == "en" else "in Arabic"
            
            prompt = f"""
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
  "category": "{category}",
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
            blog_data = self._parse_blog_content(content, topic, category, language)
            
            # Generate image for the post
            image_url = self._generate_image(blog_data['title'])
            blog_data['coverImage'] = image_url
            
            logger.info(f"Successfully generated blog post: {blog_data['title']}")
            return blog_data
            
        except Exception as e:
            logger.error(f"Error generating blog post: {str(e)}")
            # Return fallback content
            current_year = datetime.now().year
            return self._create_fallback_post(topic, category, language, current_year)

    def _parse_blog_content(self, content: str, topic: str, category: str, language: str) -> Dict[str, Any]:
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
                # Update year to current year
                current_year = datetime.now().year
                blog_data['title'] = blog_data['title'].replace('2024', str(current_year))
            
            # Ensure required fields exist with proper values
            current_year = datetime.now().year
            blog_data.setdefault('publishedAt', datetime.now().isoformat())
            blog_data.setdefault('language', language)
            blog_data.setdefault('status', 'published')
            blog_data.setdefault('featured', False)
            blog_data.setdefault('category', category)
            
            # Update any 2024 references to current year
            for key in ['title', 'content', 'metaDescription', 'excerpt']:
                if key in blog_data and isinstance(blog_data[key], str):
                    blog_data[key] = blog_data[key].replace('2024', str(current_year))
            
            return blog_data
            
        except (json.JSONDecodeError, AttributeError) as e:
            logger.warning(f"Failed to parse JSON response: {e}, using fallback structure")
            current_year = datetime.now().year
            return self._create_fallback_post(topic, category, language, current_year)

    def _create_fallback_post(self, topic: str, category: str, language: str, current_year: int) -> Dict[str, Any]:
        """Create a fallback blog post when AI generation fails"""
        clean_topic = topic.replace('2024', str(current_year))
        
        return {
            "title": f"Master {clean_topic}: Expert Guide for {current_year}",
            "metaDescription": f"Discover expert {clean_topic} strategies to boost your business with Click Sales Media's proven techniques for {current_year}.",
            "content": f"<h1>Master {clean_topic}: Expert Guide for {current_year}</h1><h2>Introduction</h2><p>In the rapidly evolving digital landscape of {current_year}, {clean_topic.lower()} has become more crucial than ever for businesses looking to thrive online. Click Sales Media brings you comprehensive insights and strategies to excel in this field.</p><h2>Key Strategies for {current_year}</h2><p>This year presents unique opportunities and challenges in {clean_topic.lower()}. Our expert team has identified the most effective approaches to maximize your success.</p><h2>How Click Sales Media Can Help</h2><p>With our proven track record and cutting-edge expertise, Click Sales Media is your trusted partner for achieving exceptional results in {clean_topic.lower()}. Contact us today to discover how we can transform your digital marketing efforts.</p>",
            "excerpt": f"In the rapidly evolving digital landscape of {current_year}, {clean_topic.lower()} has become more crucial than ever for businesses looking to thrive online. This comprehensive guide will walk you through the latest strategies and best practices that Click Sales Media uses to deliver exceptional results for our clients.",
            "tags": [clean_topic.replace(" ", "").lower(), "digitalmarketing", "marketing", "business", f"strategy{current_year}"],
            "category": category,
            "readingTime": 6,
            "publishedAt": datetime.now().isoformat(),
            "language": language,
            "status": "published",
            "featured": False
        }

    def _generate_image(self, title: str) -> str:
        """Generate image using dall-e-3"""
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
                model="dall-e-3",  # Changed to stable DALL-E 3 model
                prompt=prompt,
                size="1024x1024",  # Standard DALL-E 3 size
                quality="standard", # DALL-E 3 quality parameter
                n=1,
            )
            
            image_url = response.data[0].url
            logger.info(f"Successfully generated image: {image_url}")
            
            # Ensure we have a valid image URL
            if not image_url:
                logger.warning("Generated image URL is None, using fallback")
                return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&h=1024&fit=crop&auto=format&q=80"
            
            return image_url
            
        except Exception as e:
            logger.error(f"Error generating image with dall-e-3: {str(e)}")
            # Fallback to a high-quality professional placeholder
            return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1024&h=1024&fit=crop&auto=format&q=80"

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
                "excerpt": blog_data['excerpt'],  # Clean excerpt without AI Generated prefix
                "coverImage": blog_data["coverImage"],
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
        """Generate daily blog posts with category selection"""
        posts = []
        
        try:
            current_year = datetime.now().year
            logger.info(f"🚀 Starting daily blog post generation for {current_year} ({self.posts_per_day} posts)")
            
            # Combine all topics
            all_topics = {**self.topic_category_map, **self.industry_topics}
            
            # Select random topics
            selected_topics = random.sample(list(all_topics.keys()), self.posts_per_day)
            
            for i, topic in enumerate(selected_topics):
                # Get the category for this topic
                category = all_topics[topic]
                
                # Alternate between languages
                language = self.languages[i % len(self.languages)]
                
                logger.info(f"📝 Generating post {i+1}/{self.posts_per_day}: {topic} ({category}) in {language}")
                
                # Generate comprehensive blog post
                blog_post = self.generate_blog_post(topic, category, language)
                
                # Try to publish to Next.js
                success = self.publish_to_nextjs(blog_post)
                blog_post['published_success'] = success
                
                posts.append(blog_post)
                logger.info(f"✅ Generated: {blog_post['title']} - {'Published' if success else 'Failed to publish'}")
            
            logger.info(f"🎉 Completed daily generation: {len(posts)} posts created")
            return posts
            
        except Exception as e:
            logger.error(f"💥 Error in daily post generation: {str(e)}")
            raise

    def save_generation_log(self, posts: List[Dict[str, Any]]):
        """Save generation log for tracking"""
        log_data = {
            "timestamp": datetime.now().isoformat(),
            "posts_generated": len(posts),
            "posts": [
                {
                    "title": post["title"],
                    "category": post["category"],
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
    """Main function to run the enhanced blog generator"""
    try:
        print("🤖 Click Sales Media - Enhanced Blog Automation System")
        print("=" * 60)
        
        generator = EnhancedBlogGenerator()
        posts = generator.generate_daily_posts()
        
        # Print summary
        print(f"\n🎉 Generation Complete!")
        print(f"📊 Posts Generated: {len(posts)}")
        print("\n📝 Generated Posts:")
        
        for i, post in enumerate(posts, 1):
            print(f"   {i}. {post['title']}")
            print(f"      Category: {post['category']} | Language: {post['language']}")
            
    except Exception as e:
        logger.error(f"💥 Fatal error in main execution: {str(e)}")
        print(f"❌ Error: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main() 