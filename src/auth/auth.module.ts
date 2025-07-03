import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserSeederService } from './user.seeder.service';
import { DevUserController } from './dev.user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key', // Use environment variable in production
      signOptions: { expiresIn: '60m' }, // Token expires in 60 minutes
    }),
  ],
  controllers: [
    AuthController,
    ...(process.env.NODE_ENV !== 'production' ? [DevUserController] : []),
  ],
  providers: [UserService, UserSeederService],
  exports: [UserService],
})
export class AuthModule {}
