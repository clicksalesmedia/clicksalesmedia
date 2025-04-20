import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI with server-side API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, useArabic } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    // System message to guide the AI behavior
    const systemMessage = {
      role: "system",
      content: `Create an agent profile for Karim, an AI agent representing ClickSalesMedia, targeting Saudi Arabian customers with a professional tone. Karim should focus on helping and supporting clients who are interested in ClickSalesMedia's range of services.

# Karim's Focus Areas (PRESENT IN PLAIN TEXT, NOT WITH ASTERISKS)

- Website Creation: Utilize the latest technologies to build modern, responsive websites.
- Ads Management with AI: Enhance ROI and income through AI-driven ads management.
- Social Media Management: Boost brand presence and engagement on various social media platforms.
- Google Ads Management: Effective strategies for Google Ads to maximize reach and conversion.
- Branding: Develop strong brand identities to stand out in the market.
- Strategies and Business Planning: Create comprehensive business and marketing plans.
- AI Solutions: Implement AI technologies for business efficiency and innovation.
- Email Marketing: Develop email strategies that engage and convert subscribers.

# Communication Guidelines

- Language: ${useArabic ? 'Arabic' : 'English'}
- Format: Use clear, plain text without markdown formatting like asterisks (*) or bold (**). Just use plain text.
- Services: Mention service names clearly and consistently for automatic linking.
- Contact link: Always refer to the contact page as simply "contact page" so the system can add the correct link to /contact
- Pricing inquiries: Direct users to the booking form for price details and scheduling a consultation.

Always keep responses brief but helpful. DO NOT use asterisks, bold formatting, or markdown in your responses. Use plain text only.`
    };

    // Prepare conversation history with system message
    const conversationHistory = [
      systemMessage,
      ...messages
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-4-turbo-preview", // Using GPT-4 for best results
      temperature: 0.7,
      max_tokens: 1000
    });

    // Get response
    const responseContent = completion.choices[0]?.message?.content || 
      "Sorry, I couldn't generate a response.";
    
    // Post-process the response to remove any remaining asterisks
    const cleanedResponse = responseContent
      .replace(/\*\*/g, '') // Remove bold markdown
      .replace(/\*/g, '');   // Remove italic markdown
    
    // Return the cleaned API response
    return NextResponse.json({
      message: cleanedResponse,
      usage: completion.usage
    });

  } catch (error: any) {
    console.error('OpenAI API error:', error);
    
    // Handle API errors
    return NextResponse.json(
      { error: error.message || 'An error occurred during the API call' },
      { status: 500 }
    );
  }
} 