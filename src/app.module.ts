import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentsModule } from './payments/payments.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
