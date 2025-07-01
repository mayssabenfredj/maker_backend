import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ message: string; data: Product }> {
    try {
      const createdProduct = new this.productModel(createProductDto);
      const savedProduct = await createdProduct.save();
      return {
        message: 'Product created successfully',
        data: savedProduct,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create product: ' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<{ message: string; data: Product[] }> {
    try {
      const products = await this.productModel
        .find()
        .populate('category')
        .exec();
      return {
        message: 'Products retrieved successfully',
        data: products,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve products: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<{ message: string; data: Product }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid product ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const product = await this.productModel
        .findById(id)
        .populate('category')
        .exec();
      if (!product) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'Product retrieved successfully',
        data: product,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to retrieve product: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<{ message: string; data: Product }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid product ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      // Get the current product to check if it has an image
      const currentProduct = await this.productModel.findById(id).exec();
      if (!currentProduct) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // If there's a new image and the product had an old image, delete the old one
      if (updateProductDto.image && currentProduct.image) {
        try {
          const oldImagePath = join(process.cwd(), currentProduct.image);
          await unlink(oldImagePath);
        } catch (error) {
          // Ignore error if file doesn't exist
          console.log('Old image file not found or already deleted');
        }
      }

      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, updateProductDto, { new: true })
        .populate('category')
        .exec();

      if (!updatedProduct) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Product not found after update',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        message: 'Product updated successfully',
        data: updatedProduct,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update product: ' + error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: string): Promise<{ message: string; data: null }> {
    if (!isValidObjectId(id)) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid product ID',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const deletedProduct = await this.productModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedProduct) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Delete the associated image file if it exists
      if (deletedProduct.image) {
        try {
          const imagePath = join(process.cwd(), deletedProduct.image);
          await unlink(imagePath);
        } catch (error) {
          // Ignore error if file doesn't exist
          console.log('Image file not found or already deleted');
        }
      }

      return {
        message: 'Product deleted successfully',
        data: null,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete product: ' + error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
