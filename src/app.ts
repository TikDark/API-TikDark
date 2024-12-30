
import express from 'express';
import { calculateRouter } from './routes/calculateRoutes'; // Caminho correto para o seu arquivo de rotas

const app = express();

// Use apenas a parte de rotas
app.use(express.json()); // Para analisar JSON no corpo da requisição
app.use('/calculate', calculateRouter); // Certifique-se de que a rota está sendo usada corretamente

export default app;
