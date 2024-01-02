import { Module } from '@nestjs/common';
import { UserController } from './transport/user.controller';
import { UserService } from './service/user.service';
import { UserRepository } from './repo/user.repository';
import { DBModule } from 'src/common/modules/db/db.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [DBModule],
})
export class UserModule {}
