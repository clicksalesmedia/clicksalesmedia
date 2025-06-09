# 🤖 Blog Automation System

Automated blog post generation system for Click Sales Media using OpenAI API, UV Python, and Next.js integration.

## ✨ Features

- **Automated Blog Generation**: Creates 2 blog posts daily using OpenAI GPT models
- **Multi-language Support**: Generates content in English and Arabic
- **AI Image Generation**: Uses OpenAI DALL-E 3 for professional blog images
- **Smart Topics**: Covers 25+ marketing topics and 15+ industry-specific areas
- **Next.js Integration**: Automatically publishes to your website
- **Cron Job Automation**: Runs daily at 9:00 AM
- **Comprehensive Logging**: Tracks generation success/failures
- **Error Handling**: Robust error handling and fallback mechanisms

## 📋 Topics Covered

### Marketing Topics
- AI Marketing, SEO Optimization, Performance Marketing
- PPC Advertising, Social Media Marketing, Email Marketing
- E-commerce Marketing, Content Marketing, Brand Strategy
- Marketing Analytics, Digital Transformation, Video Marketing
- And 15+ more marketing topics...

### Industry-Specific Topics
- Healthcare, Real Estate, E-commerce, SaaS, Finance
- Education, Hospitality, Automotive, Fashion, Technology
- Food & Beverage, Travel, Fitness, Beauty, Legal
- And more industries...

## 🚀 Quick Start

### 1. Installation
```bash
# The UV environment is already set up
cd backend/blog-automation

# Install dependencies (already done)
~/.local/bin/uv add openai requests python-dotenv pillow
```

### 2. Configuration
Edit `.env` file with your settings:
```env
OPENAI_API_KEY=your_openai_key_here
NEXTJS_API_URL=https://clicksalesmedia.com/api
POSTS_PER_DAY=2
LANGUAGES=en,ar
```

### 3. Manual Run (Test)
```bash
# Run once to test
~/.local/bin/uv run python blog_generator.py

# Or use the shell script
./run_daily.sh
```

### 4. Setup Automation
```bash
# Install daily cron job (9:00 AM)
./setup_cron.sh
```

## 📁 Project Structure

```
backend/blog-automation/
├── .env                    # Environment configuration
├── blog_generator.py       # Main blog generation script
├── run_daily.sh           # Daily execution script
├── setup_cron.sh          # Cron job setup script
├── README.md              # This file
├── pyproject.toml         # UV project configuration
├── logs/                  # Execution logs
├── generation_log_*.json  # Daily generation logs
└── blog_automation.log    # Application logs
```

## 🔧 Configuration Options

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key
- `NEXTJS_API_URL`: Next.js API endpoint (default: https://clicksalesmedia.com/api)
- `POSTS_PER_DAY`: Number of posts to generate daily (default: 2)
- `LANGUAGES`: Comma-separated languages (default: en,ar)
- `LOG_LEVEL`: Logging level (default: INFO)

### Customization
You can modify topics in `blog_generator.py`:
- `self.topics`: General marketing topics
- `self.industries`: Industry-specific topics

## 📊 Generated Content Structure

Each blog post includes:
- **SEO-optimized title** (60 characters max)
- **Meta description** (150 characters max)
- **Comprehensive content** (800-1200 words)
- **AI-generated images** (1792x1024 professional headers)
- **Relevant tags** (5-7 tags per post)
- **Click Sales Media integration** (how we can help section)
- **Multi-language support** (English/Arabic)

## 🔄 Automation Schedule

- **Daily Generation**: 9:00 AM every day
- **Content**: 2 posts (1 English, 1 Arabic)
- **Topics**: Randomly selected from 40+ available topics
- **Publishing**: Automatic to Next.js website
- **Logging**: Complete execution logs

## 📝 Logs & Monitoring

### Log Files
- `blog_automation.log`: Application execution logs
- `logs/daily_run_*.log`: Daily execution logs
- `generation_log_*.json`: Structured generation data

### Monitoring
```bash
# View recent logs
tail -f blog_automation.log

# Check daily execution logs
ls -la logs/

# View generation history
cat generation_log_$(date +%Y%m%d).json
```

## 🛠️ Manual Operations

### Generate Single Post
```python
from blog_generator import BlogGenerator

generator = BlogGenerator()
post = generator.generate_blog_post("AI Marketing", "en")
success = generator.publish_to_nextjs(post)
```

### Test API Connection
```bash
# Test OpenAI connection
~/.local/bin/uv run python -c "
from blog_generator import BlogGenerator
generator = BlogGenerator()
print('✅ OpenAI connection successful')
"
```

## 🚨 Troubleshooting

### Common Issues

1. **OpenAI API Errors**
   - Check API key validity
   - Verify billing/credits
   - Check rate limits

2. **Next.js API Errors**
   - Verify API endpoint URL
   - Check network connectivity
   - Validate API response format

3. **Cron Job Not Running**
   - Check cron service: `sudo service cron status`
   - Verify cron job: `crontab -l`
   - Check script permissions: `ls -la run_daily.sh`

### Debug Mode
```bash
# Run with verbose logging
LOG_LEVEL=DEBUG ~/.local/bin/uv run python blog_generator.py
```

## 📈 Performance & Costs

### OpenAI Usage
- **o1-mini**: ~$0.003 per 1K tokens (text generation)
- **DALL-E 3**: ~$0.040 per image (1792x1024)
- **Daily cost**: ~$0.50-1.00 for 2 posts with images

### Execution Time
- Single post generation: 30-60 seconds
- Image generation: 10-20 seconds
- Total daily execution: 2-3 minutes

## 🔐 Security

- API keys stored in `.env` (not in version control)
- Secure HTTPS communication
- Error handling prevents key exposure
- Automatic cleanup of old logs

## 🔄 Updates & Maintenance

### Update Dependencies
```bash
~/.local/bin/uv sync
```

### Backup Configuration
```bash
# Backup important files
cp .env .env.backup
cp blog_generator.py blog_generator.py.backup
```

## 📞 Support

For issues or questions:
1. Check logs in `blog_automation.log`
2. Review generation logs in `logs/` directory
3. Test manual execution with `./run_daily.sh`
4. Verify OpenAI API status and credits

## 🎯 Future Enhancements

- **Content personalization** based on website analytics
- **A/B testing** for different content styles
- **Social media integration** for automatic sharing
- **Content calendar** with strategic planning
- **SEO optimization** with keyword research integration
- **Performance analytics** and content success metrics

---

**Made with ❤️ for Click Sales Media**

