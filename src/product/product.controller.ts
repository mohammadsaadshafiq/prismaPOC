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
import {changeName} from '../common/utils'
import { Product } from '../product';
import { ProductService } from '../product/product.service';
import { ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
    @ApiCreatedResponse({ description: 'Create new product' })
    @ApiBody({ type: Product })
  create(@Body() createUserDto: Product) {
    return this.productService.create(createUserDto);
  }
  @Get()
   @ApiOkResponse({ description: 'All Products' })
  getAll() {
    return this.productService.findAll();
  }
  @Put(':id')
    @ApiBody({ type: Product })
    @ApiCreatedResponse({ description: 'Update Product' })
  update(@Param('id') productId: string, @Body() updatedProduct: Product) {
    var result  =this.productService.update(productId, updatedProduct);
    result = changeName(result,productId)
    return result
  }
  @Delete(':id')
    @ApiOkResponse({ description: 'Product Removed' })
  removeProduct(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  @Get(':id')
  @ApiOkResponse({ status: 201, description: 'Product' })
  @ApiNotFoundResponse({ status: 404, description: 'ID not found.'})
  findOne(@Param('id') id: string) {
    const product = this.productService.findOne(id);
    if (product) {
      return product;
    } else {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND); // just throw a not found exception
    }
  }
}
