import { DynamicModule, Global, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProductModule } from "./product/product.module";
import { ConfigModule, registerAs } from "@nestjs/config";
import { Client, ClientsModule, Transport } from "@nestjs/microservices";
@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
