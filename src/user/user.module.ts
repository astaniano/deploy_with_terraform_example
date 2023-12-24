import { Module } from '@nestjs/common';
import { UserController } from './transport/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repo/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
