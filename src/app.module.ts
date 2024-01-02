import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from './common/modules/config/config.module';
import { DBModule } from './common/modules/db/db.module';

@Module({
  imports: [UserModule, ConfigModule, DBModule],
})
export class AppModule {}
