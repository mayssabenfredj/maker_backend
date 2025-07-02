import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

/**
 * Auth Service - Handles only login logic
 * No signup functionality as per requirements
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<{ message: string; user: any }> {
    const { email, password } = loginDto;
    
    // Find user by email
    const user = await this.userModel.findOne({ email }).exec();
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // In a real application, you should hash passwords and compare hashed values
    // For now, we'll do a simple comparison (NOT recommended for production)
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    
    return {
      message: 'Login successful',
      user: userWithoutPassword,
    };
  }

  // Helper method to create a user (for testing purposes)
  async createUser(email: string, password: string, name?: string): Promise<User> {
    const user = new this.userModel({ email, password, name });
    return user.save();
  }
}