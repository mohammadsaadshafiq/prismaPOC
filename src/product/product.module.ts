import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    ClientsModule.register([
      {
        name: "BILLING_SERVICE",
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'billing',
            brokers: ['localhost:29092'],
          },
          producerOnlyMode: true
        },
      },
    ]),
  ],
})
export class ProductModule {}
