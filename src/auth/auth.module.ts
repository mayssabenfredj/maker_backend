import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { UserSeederService } from './user.seeder.service';
import { DevUserController } from './dev.user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    AuthController,
    ...(process.env.NODE_ENV !== 'production' ? [DevUserController] : []),
  ],
  providers: [UserService, UserSeederService],
  exports: [UserService],
})
export class AuthModule {}
