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
    try {
      await this.prisma.product.findMany()
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          console.log(
            'There is a unique constraint violation, a new user cannot be created with this email'
          )
        }
      }
      throw e
    }
  }
  async findOne(productId: string) {
    const  result = await this.prisma.product.findUnique({ where:{id:productId} }); 
    console.log(result)
    if (result){
      return result
    }
    else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
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
