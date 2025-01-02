import mongoose, { Schema, Document } from 'mongoose';

interface ICheckout extends Document {
  videoLink: string;
  likes: number;
  views: number;
  shares: number;
  saves: number;
  total: number;
  createdAt: Date;
}

const CheckoutSchema: Schema = new Schema(
  {
    videoLink: { type: String, required: true },
    likes: { type: Number, required: true },
    views: { type: Number, required: true },
    shares: { type: Number, required: true },
    saves: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: false } }
);

const Checkout = mongoose.model<ICheckout>('Checkout', CheckoutSchema);

export { Checkout, ICheckout };
