import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  public dbUrl: string;

  constructor() {
    this.dbUrl = this.loadEnv('DATABASE_URL');
  }

  private loadEnv(key: string) {
    const envVar = process.env[key];

    if (!envVar) {
      throw new Error(`${key} is a required env variable`);
    }

    return envVar;
  }
}
