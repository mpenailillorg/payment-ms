import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs';
import Stripe from 'stripe';

@Injectable()
export class PaymentsRestService {
    private readonly stripe = new Stripe(envs.stripeSecret)

    async createPaymentSession() {
        const session = await this.stripe.checkout.sessions.create({
          // Colocar aqui el id de la orden
          payment_intent_data: {
            metadata: {}
          },
          line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'T-shirt'
                },
                unit_amount: 2000, // 2000 equivale a 20 dolares, espera decimales
            },
            quantity: 2
          }],
          mode: 'payment',
          success_url: 'http://localhost:3003/payments-rest/success',
          cancel_url: 'http://localhost:3003/payments-rest/cancel'
        })

        return session;
    }
}
