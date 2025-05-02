import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { stripeRouter } from './routes/stripeRoutes';
import { connectDB } from './config/db'; 

const app = express();
const port = process.env.PORT || 3000;

connectDB();


app.use(cors());
app.use(bodyParser.json());


app.use('/api', stripeRouter);


app.get('/', (req, res) => {
  res.send('Servidor rodando');
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
