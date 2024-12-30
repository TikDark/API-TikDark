import { Request, Response } from 'express';
import { calculateTotal } from '../models/calculateModel';

export const calculate = (req: Request, res: Response): Response => {
  const { likes, views, shares, saves, videos } = req.body;

  // Validação
  if (!likes || !views || !shares || !saves || !videos) {
    return res.status(400).json({ error: 'All parameters are required.' });
  }
  if (videos > 5) {
    return res.status(400).json({ error: 'Maximum of 5 videos allowed.' });
  }

  // Chama a função de cálculo do modelo
  const total = calculateTotal(likes, views, shares, saves, videos);
  return res.json({ total: total.toFixed(2) });
};
