import { Router, Request, Response } from 'express';
import { createCheckoutSession } from '../controllers/stripeController';  // Importando o controlador

const stripeRouter = Router();  // Inicializa o Router

// Definindo a rota para o checkout e chamando a função do controlador diretamente
stripeRouter.post('/checkout', (req: Request, res: Response) => {
  createCheckoutSession(req, res);  // Chama a função de controle
});

export { stripeRouter };
