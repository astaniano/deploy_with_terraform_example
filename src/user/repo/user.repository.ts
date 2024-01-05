import { Injectable } from '@nestjs/common';
import { DBService } from 'src/common/modules/db/db.service';

@Injectable()
export class UserRepository {
  constructor(private readonly db: DBService) {}

  public async create(email: string, password: string, activationLink: string) {
    return this.db.instance.none(
      `INSERT INTO ${this.db.tables.USERS}(email, password, activation_link) 
       VALUES ($/email/, $/password/, $/activationLink/)`,
      { email, password, activationLink },
    );
  }

  public async getAllUsersTemp() {
    return this.db.instance.many(`SELECT * FROM ${this.db.tables.USERS}`);
  }

  public async migrateTemp() {
    await this.db.instance.none(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await this.db.instance.none(
      `CREATE TABLE users (
        id UUID DEFAULT uuid_generate_v4(),
        password VARCHAR ( 250 ) NOT NULL,
        email VARCHAR ( 255 ) UNIQUE NOT NULL,
        activation_link VARCHAR ( 36 ) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        PRIMARY KEY (id)
      );`,
    );
  }
}
