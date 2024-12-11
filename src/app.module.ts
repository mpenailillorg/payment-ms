import { Module } from '@nestjs/common';

import { PaymentsModule } from './payments/payments.module';
import { NatsModule } from './transports/nats.module';
import { PaymentsRestModule } from './payments-rest/payments-rest.module';

@Module({
  imports: [PaymentsModule, PaymentsRestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
