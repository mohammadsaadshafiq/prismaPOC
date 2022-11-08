import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    return await this.prisma.product.findMany()
  }
  async findOne(productId: string) {
    const  result = await this.prisma.product.findUnique({ where:{id:productId} }); 
    console.log(result)
    if (result){
      return result
    }
    else {
      throw new HttpException('ID not found', HttpStatus.NOT_FOUND);
    }
  }
  async remove(productId: string) {
     const result = await this.prisma.product.delete({
      where: {
        id: productId,
      },
    })
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
