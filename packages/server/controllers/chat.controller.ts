import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

//implementation detail / keep private
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long. Max 1000 characters.'),
   conversationID: z.uuid(),
});

//public interface
export const chatController = {
   async sendMessage(req: Request, res: Response) {
      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);

         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({
            error: 'Internal Server Error, failed to generate response',
         });
      }

      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(parseResult.error?.format());
         return;
      }

      const response = await client.responses.create({
         model: 'gpt-4.1-nano',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 50,
         previous_response_id: conversations.get(conversationID),
      });

      conversations.set(conversationID, response.id);
      res.json({ message: response.output_text });
   },
};
