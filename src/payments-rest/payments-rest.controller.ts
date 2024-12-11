import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsRestService } from './payments-rest.service';
import { CreatePaymentSessionDto } from 'src/dto/create-payment-session.dto';
import { Request, Response } from 'express';

@Controller('payments-rest')
export class PaymentsRestController {
  constructor(private readonly paymentsRestService: PaymentsRestService) {}

  @Post('create-payment-session')
  createPaymentSession(@Body() createPaymentSessionDto: CreatePaymentSessionDto) {
    // return createPaymentSessionDto;
    return this.paymentsRestService.createPaymentSession(createPaymentSessionDto)
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
  strippeWebhook(@Req() req: Request, @Res() res: Response) {
    console.log('Stripe Webhook called');
    
    return this.paymentsRestService.stripeWebhook(req, res);
  }

}
