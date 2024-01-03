import * as path from 'node:path';
import * as fs from 'node:fs';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import * as pgpFunc from 'pg-promise';
import { ENV } from 'src/common/enum';

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
    let ssl = {} as { ssl?: { rejectUnauthorized?: boolean; ca?: string } };

    if (this.configService.currentEnv === ENV.PROD) {
      const caPath =
        path.join(process.cwd(), 'deployment/aws/rds/') +
        'eu-north-1-bundle.pem';
      ssl = {
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync(caPath).toString(),
        },
      };
    }

    const pgp = pgpFunc();
    this.instance = await pgp({
      connectionString: this.configService.dbUrl,
      ...ssl,
    });
  }
}
