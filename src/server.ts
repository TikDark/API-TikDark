import dotenv from 'dotenv';
dotenv.config(); // Carrega as variáveis do arquivo .env

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { stripeRouter } from './routes/stripeRoutes';
import { connectDB } from './config/db'; // Importa a função de conexão

const app = express();
const port = process.env.PORT || 3000;

// Conecta ao MongoDB
connectDB();

// Middleware para ler o corpo das requisições como JSON
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api', stripeRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor rodando');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
