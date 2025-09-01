export type ChatRequest = {
   prompt: string;
   conversationId: string;
};

export type ChatResponse = {
   message: string;
};

export const sendMessage = async (data: ChatRequest): Promise<ChatResponse> => {
   const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   });

   if (!res.ok) {
      const errorData = await res.json();
      throw new Error(JSON.stringify(errorData));
   }

   return res.json();
};
