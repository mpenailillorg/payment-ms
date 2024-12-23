import { Body, Controller, Get, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { PaymentsRestService } from './payments-rest.service';
import { CreatePaymentSessionDto } from 'src/dto/create-payment-session.dto';
import { Request, Response } from 'express';
import { endWith } from 'rxjs';

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
  strippeWebhook(@Req() req: RawBodyRequest<Request>, @Res() res: Response) { // Se usa el request y response de express ya que stripe pide el raw del request
    console.log('Stripe Webhook called', { signature: req.headers['stripe-signature'] , reqBody: req.body, data: req.body.data });
    
    return this.paymentsRestService.stripeWebhook(req, res);
  }

}
