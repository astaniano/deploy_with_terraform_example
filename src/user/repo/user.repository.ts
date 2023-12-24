import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
//     constructor(
//     userRepo: UserRepository 
//   ) {}
  
    public async create(email: string, password: string, activationLink: string) {
        return true
    }
}
