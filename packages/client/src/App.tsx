import { useState } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { sendMessage } from './services/chatApi';
import { v4 as uuidv4 } from 'uuid';

function App() {
   const [prompt, setPrompt] = useState('');
   const [messages, setMessages] = useState<string[]>([]);
   const [conversationId] = useState(uuidv4()); // new conversation per page load
   const [loading, setLoading] = useState(false);

   const handleSend = async () => {
      if (!prompt.trim()) return;

      setLoading(true);
      try {
         const response = await sendMessage({ prompt, conversationId });
         setMessages((prev) => [
            ...prev,
            `You: ${prompt}`,
            `CrimBot: ${response.message}`,
         ]);
         setPrompt('');
      } catch (err) {
         console.error(err);
         setMessages((prev) => [...prev, `Error: ${(err as Error).message}`]);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-6">
         <Card className="w-full max-w-md shadow-2xl rounded-2xl">
            <CardHeader>
               <CardTitle className="text-2xl font-bold text-center">
                  CrimBot Chat
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="h-64 overflow-y-auto border rounded-md p-2 space-y-1 bg-white">
                  {messages.map((msg, i) => (
                     <p key={i} className="text-sm">
                        {msg}
                     </p>
                  ))}
               </div>

               <div className="flex gap-2">
                  <Input
                     placeholder="Type a message..."
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button
                     onClick={handleSend}
                     disabled={loading}
                     className="whitespace-nowrap"
                  >
                     {loading ? 'Sending...' : 'Send'}
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}

export default App;
