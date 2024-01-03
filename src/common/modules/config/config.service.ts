import { Injectable } from '@nestjs/common';
import { ENV } from 'src/common/enum';

@Injectable()
export class ConfigService {
  public dbUrl: string;
  public currentEnv: string;

  constructor() {
    this.dbUrl = this.loadEnv('DATABASE_URL');
    this.currentEnv = this.loadEnvIfInEnum('NODE_ENV', Object.values(ENV));
  }

  private loadEnv(key: string) {
    const envVar = process.env[key];

    if (!envVar) {
      throw new Error(`${key} is a required env variable`);
    }

    return envVar;
  }

  private loadEnvIfInEnum(key: string, enumValues: string[]) {
    const envVar = process.env[key];
    
    const envVarIsOneOfEnumValues = enumValues.find((val) => val === envVar)
    if (!envVarIsOneOfEnumValues) {
      throw new Error(`${key} env var must be one of the following: ${enumValues}`);
    }

    return envVar;
  }
}
