import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as pgpFunc from 'pg-promise';

const tableNames = {
  USERS: 'users',
};

@Injectable()
export class DBService implements OnModuleInit {
  public tables: typeof tableNames;
  public instance: any;

  constructor(private readonly configService: ConfigService) {
    this.tables = tableNames;
  }

  public async onModuleInit() {
    const pgp = pgpFunc();
    this.instance = await pgp(this.configService.dbUrl);
  }
}
