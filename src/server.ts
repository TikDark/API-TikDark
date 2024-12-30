import dotenv from 'dotenv';
dotenv.config();  // Carrega as variáveis do arquivo .env


// src/server.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { calculateRouter } from './routes/calculateRoutes';
import { stripeRouter } from './routes/stripeRoutes';

const app = express();
const port = 3000;

// Middleware para ler o corpo das requisições como JSON
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', calculateRouter);  // Rota para cálculo
app.use('/api', stripeRouter);  // Rota para Stripe

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
