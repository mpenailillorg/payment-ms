import { Injectable, RawBody } from '@nestjs/common';
import { Request, Response } from 'express';
import { envs } from 'src/config/envs';
import { CreatePaymentSessionDto } from 'src/dto/create-payment-session.dto';
import Stripe from 'stripe';

@Injectable()
export class PaymentsRestService {
  private readonly stripe = new Stripe(envs.stripeSecret)
  private readonly endpointSecret = envs.stripeEndpointSecret;

  async createPaymentSession(createPaymentSessionDto: CreatePaymentSessionDto) {
    const { currency, items, orderId } = createPaymentSessionDto;
    const lineItems = items.map(item => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity
    }))

    const session = await this.stripe.checkout.sessions.create({
      // Colocar aqui el id de la orden
      payment_intent_data: {
        metadata: {
          orderId
        }
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: envs.stripeSuccessUrl,
      cancel_url: envs.stripeCancelUrl
    })

    return session;
  }

  async stripeWebhook(request: Request, response: Response) {

    console.log('stripe webhook')
    let event: Stripe.Event;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse

    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      // console.log('stripe', { signature, secret: this.endpointSecret, RawBody: request['rawBody'] });
      
      event = this.stripe.webhooks.constructEvent(
        request['rawBody'],
        signature,
        this.endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      // return response.sendStatus(400);
      response.status(400).send('Webhook Error')
      return
    }

    console.log('Event =============>', event.type);

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      case 'charge.succeeded':
        const chargeSucceded = event.data.object;
        console.log('Charge Succeded', chargeSucceded)
        // TODO: Llamar al micro
        console.log('charge succeeded', chargeSucceded.metadata);
        break

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }


    return response.status(200).json({ signature })
  }
}