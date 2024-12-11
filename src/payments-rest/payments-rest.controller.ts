import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsRestService } from './payments-rest.service';

@Controller('payments-rest')
export class PaymentsRestController {
  constructor(private readonly paymentsRestService: PaymentsRestService) {}

  @Post('create-payment-session')
  createPaymentSession() {
    return this.paymentsRestService.createPaymentSession()
  }

  @Get('success')
  success() {
    return {
      ok: true,
      message: 'Payment successfull'
    }
  }

  @Get('cancel')
  camcel() {
    return {
      ok: false,
      message: 'Payment cancelled'
    }
  }

  @Post('webhook')
  strippeWebhook() {
    return 'strippeWebhook'
  }

}
