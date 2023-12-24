import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MailModule } from './common/services/mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
})
export class AppModule {}
