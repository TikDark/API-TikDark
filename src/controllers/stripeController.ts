// src/controllers/stripeController.ts
import { Request, Response } from 'express';
import { stripe } from '../utils/stripe';  // Importa a instância do Stripe

export const createCheckoutSession = async (req: Request, res: Response) => {
  // Acessa corretamente a propriedade `total` do corpo da requisição
  const { total } = req.body;

  // Verifica se o valor de total é válido
  if (!total || total <= 0) {
    return res.status(400).json({ error: 'Invalid total value' });
  }

  try {
    // Cria a sessão de checkout no Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Total Payment',
            },
            unit_amount: total * 100,  // Convertendo para centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}`,
    });

    // Retorna a URL da sessão criada
    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};
