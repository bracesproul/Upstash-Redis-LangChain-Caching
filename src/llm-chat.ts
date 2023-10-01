import { upstashRedisCache } from './redis';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain } from 'langchain/chains';
import { ChatPromptTemplate } from 'langchain/prompts';
import dotenv from 'dotenv';

dotenv.config();

// Makes chat requests to OpenAI and returns a response
export async function llmChat(prompt: string): Promise<string> {
  // Check if our OpenAI API key is set
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable not set');
  }

  const systemTemplate =
    'You are a helpful assistant for the owner of a small dog food business. Do not disclose you are an AI assistant. Reply in short concise sentences.';
  const humanTemplate = '{prompt}';

  // Creates our chat prompt we will eventually pass to the chat function
  const chatPrompt = ChatPromptTemplate.fromMessages([
    ['system', systemTemplate],
    ['human', humanTemplate],
  ]);

  const chat = new ChatOpenAI({
    temperature: 1, // We want our responses to be more creative
    cache: upstashRedisCache, // Pass in our Upstash Redis client
    openAIApiKey: process.env.OPENAI_API_KEY, // Pass in our OpenAI API key
  });

  const chain = new LLMChain({
    llm: chat,
    prompt: chatPrompt,
  });

  const result = await chain.predict({
    prompt,
  });

  // Return the generated response
  return result;
}
