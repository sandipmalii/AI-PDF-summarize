import OpenAI from 'openai';
import {SUMMARY_SYSTEM_PROMPT} from '@/utils/prompts';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const SUMMARY_SYSTEM_PROMPT = "You are a helpful assistant that summarizes documents."; // Define this or import if it's defined elsewhere

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
        { role: 'user', 
          content: 'Transform this document into an engaging,easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${pdfText}', 
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return completion.choices[0]?.message?.content ?? '';
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED');
    }
    throw error;
  }
}
