import { Injectable } from '@nestjs/common';
import { Product } from '../product';
import { PrismaClient, Prisma } from '@prisma/client'
@Injectable()
export class ProductService {
  constructor() {} // private productRepo: MongoRepository<Products>, // @InjectRepository(Products)
  products: Product[] = [];
  prisma = new PrismaClient()
  // With TypeORM method
   create(createProductDto: Product) {
    ///createProductDto.productId = crypto.randomUUID();
    return this.prisma.product.create({ data: createProductDto });
   //return this.productRepo.save(createProductDto); //use update with upsert
  }
  async findAll(){
   // return this.productRepo.find();
  }
  async findOne(productId: string) {
    // const result = await this.productRepo.findOneBy({ productId }); //remove
    // return result;
  }
  async remove(productId: string) {
    // const result = await this.productRepo.findOneBy({ productId });
    // return await this.productRepo.remove(result);
  }
  async update(productId: string, updatedProduct: Product) {
    // const productObj = await this.productRepo.findOneBy({ productId });
    // productObj.description = updatedProduct.description;
    // productObj.title = updatedProduct.title;
    // productObj.price = updatedProduct.price;
    // return await this.productRepo.save(productObj); //update it
  }
}
