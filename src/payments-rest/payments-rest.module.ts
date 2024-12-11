import { Module } from '@nestjs/common';
import { PaymentsRestService } from './payments-rest.service';
import { PaymentsRestController } from './payments-rest.controller';

@Module({
  controllers: [PaymentsRestController],
  providers: [PaymentsRestService],
})
export class PaymentsRestModule {}
