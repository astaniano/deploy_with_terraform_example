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
}
