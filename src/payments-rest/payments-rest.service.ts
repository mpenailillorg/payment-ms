import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs';
import { CreatePaymentSessionDto } from 'src/dto/create-payment-session.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentsRestService {
    private readonly stripe = new Stripe(envs.stripeSecret)

    async createPaymentSession(createPaymentSessionDto: CreatePaymentSessionDto) {
        const { currency, items } = createPaymentSessionDto;
        const lineItems = items.map(item => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round( item.price * 100)
            },
            quantity: item.quantity
          }))

        const session = await this.stripe.checkout.sessions.create({
          // Colocar aqui el id de la orden
          payment_intent_data: {
            metadata: {}
          },
          line_items: lineItems,
          mode: 'payment',
          success_url: 'http://localhost:3003/payments-rest/success',
          cancel_url: 'http://localhost:3003/payments-rest/cancel'
        })

        return session;
    }
}
