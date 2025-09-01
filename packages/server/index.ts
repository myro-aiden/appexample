import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatController } from './controllers/chat.controller';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('Hello from the server! yer');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the server! yer' });
});

app.post('/api/chat', chatController.sendMessage);

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
