import OpenAI from 'openai';
import { conversationRepository } from '../repositries/conversation.repositry';

// implementation detail / keep private
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ChatResponse = {
   id: string;
   message: string;
};

//public interface
//leaky abstraction
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await client.responses.create({
         model: 'gpt-4.1-nano',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 50,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.setLastResponseId(conversationId, response.id);

      return { id: response.id, message: response.output_text };
   },
};
