import { Injectable } from '@nestjs/common';
import { envs } from 'src/config/envs';
import Stripe from 'stripe';

@Injectable()
export class PaymentsRestService {
    private readonly stripe = new Stripe(envs.stripeSecret)
}
