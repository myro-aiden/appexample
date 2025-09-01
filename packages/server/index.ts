import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import cors from 'cors';

dotenv.config();

//Create app
const app = express();
// Enable CORS for all routes (or specify origins)
app.use(
   cors({
      origin: 'http://localhost:5173', // your Vite client port
   })
);
//Middleware to parse JSON bodies
app.use(express.json());
app.use(router);
//Initialize port / server
const port = process.env.PORT || 3000;
//Start server / app
app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
