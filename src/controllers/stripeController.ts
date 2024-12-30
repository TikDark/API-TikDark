import { Request, Response } from 'express';
import { stripe } from '../utils/stripe';  // Importa a instância do Stripe

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { total } = req.body;

  // Verifica se o valor de total é válido
  if (!total || total <= 0) {
    return res.status(400).json({ error: 'Invalid total value' });
  }

  // Convertendo para centavos e garantindo que o valor seja um número inteiro
  const totalInCents = Math.round(total * 100); // Multiplica por 100 e arredonda para centavos

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
            unit_amount: totalInCents,  // Usando o valor em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}`,
    });

    // Retorna o sessionId para o frontend
    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};
