import { Router, Request, Response } from 'express';
import { createCheckoutSession } from '../controllers/stripeController';  

const stripeRouter = Router();  

stripeRouter.post('/checkout', (req: Request, res: Response) => {
  createCheckoutSession(req, res);  
});

export { stripeRouter };
