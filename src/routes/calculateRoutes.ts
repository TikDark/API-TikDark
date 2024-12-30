import { Router, Request, Response } from 'express';
import { calculate } from '../controllers/calculateController';

const calculateRouter = Router();

calculateRouter.post('/calculate', (req: Request, res: Response) => {
  calculate(req, res);  // Chama a função de controle
});

export { calculateRouter };
