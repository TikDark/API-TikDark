// src/utils/stripe.ts
import Stripe from 'stripe';

// Verifica se a chave da API está definida no arquivo .env
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

// Inicializa o Stripe com a chave da API
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-12-18.acacia' });

export { stripe };
