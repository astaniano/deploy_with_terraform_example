import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repo/user.repository';
import { createHash } from 'src/common/utils/utils';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async create(email: string, password: string) {
    const hashedPassword = await createHash(password);
    const activationLink = randomUUID();

    await this.userRepo.create(email, hashedPassword, activationLink);

    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/activate/${activationLink}`,
    // );

    // const userDto = new UserDto(user); // id, email, isActivated
    // const tokens = tokenService.generateTokens({ ...userDto });
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // return { ...tokens, user: userDto };
  }

  public async getAllUsersTemp() {
    return this.userRepo.getAllUsersTemp();
  }

  public async migrateTemp() {
    return this.userRepo.migrateTemp();
  }
}
