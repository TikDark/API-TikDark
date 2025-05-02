import { Request, Response } from 'express';
import { stripe } from '../utils/stripe';
import { Checkout } from '../models/Checkout';

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { videoLink, likes, views, shares, saves, total } = req.body;

  
  if (!videoLink || typeof videoLink !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing videoLink' });
  }

  if (!likes || likes < 0 || !views || views < 0 || !shares || shares < 0 || !saves || saves < 0) {
    return res.status(400).json({ error: 'Invalid metrics. Metrics must be non-negative numbers.' });
  }

  if (!total || total <= 0) {
    return res.status(400).json({ error: 'Invalid total value' });
  }


  const totalInCents = Math.round(total * 100);

  try {
  
    const checkout = new Checkout({ videoLink, likes, views, shares, saves, total });
    await checkout.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Social Media Metrics Payment',
              description: `Payment for video: ${videoLink}`,
            },
            unit_amount: totalInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};
