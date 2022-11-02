import { Injectable } from '@nestjs/common';
import { Product } from '../product'; 
import { PrismaClient, Prisma } from '@prisma/client'
import { map } from 'rxjs';
@Injectable()
export class ProductService {
  constructor() {} 
  products: Product[] = [];

  prisma = new PrismaClient()
   async create(createProductDto: Product) {
    const result= await this.prisma.product.create({ data: createProductDto });
    return result;
  }
  async findAll(){
   const result= await this.prisma.product.findMany();
   console.log("saad",result);
   return result;
  }
  async findOne(productId: string) {
    const result = await this.prisma.product.findUnique({ where:{id:productId} });
    return result;
  }
  async remove(productId: string) {
     const result = await this.prisma.product.delete({ where:{id:productId}  });
     return "Product Deleted";
  }
  async update(productId: string, updatedProduct: Product) {
    const result = await this.prisma.product.update({
        where: {
          id:productId
        },
      data: updatedProduct
    }) ; 
  return result;
  }
}
