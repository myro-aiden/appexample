import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
   res.send('Hello from the server! yer');
});

router.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the server! yer' });
}); // we shouldnt have houte handlers here, but a reference to a function in the controller

router.post('/api/chat', chatController.sendMessage);

export default router;
