import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from '../product';
import { ProductService } from '../product/product.service';
//import { ApiBody, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  //   @ApiCreatedResponse({ description: 'Create new product' })
  //   @ApiBody({ type: Product })
  create(@Body() createUserDto: Product) {
    return this.productService.create(createUserDto);
  }
  @Get()
  //   @ApiOkResponse({ description: 'All Products' })
  getAll() {
    const products = this.productService.findAll();
    return products;
  }
  @Put(':id')
  //   @ApiBody({ type: Product })
  //   @ApiCreatedResponse({ description: 'Update Product' })
  update(@Param('id') id: string, @Body() updatedProduct: Product) {
    return this.productService.update(id, updatedProduct);
  }
  @Delete(':id')
  //   @ApiOkResponse({ description: 'Product Removed' })
  removeProduct(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  @Get(':id')
  //   @ApiOkResponse({ description: 'Product' })
  // tell the swagger about the exeption
  findOne(@Param('id') id: string) {
    const product = this.productService.findOne(id);
    if (product) {
      return product;
    } else {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND); // just throw a not found exception
    }
  }
}
