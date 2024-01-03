import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserSignupBody } from './interface';

@Controller({
  version: '1',
  path: '/user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  public async create(@Body() userSignupBody: UserSignupBody) {
    // TODO: validation, sanitization
    const { email, password } = userSignupBody;

    await this.userService.create(email, password);

    // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    // return res.json(userData);
    return { created: true };
  }

  // TODO: remove temp endpoint
  @Get()
  public async getAllUsersTemp() {
    return this.userService.getAllUsersTemp();
  }

  //     router.post('/registration',
  //     body('email').isEmail(),
  //     body('password').isLength({min: 3, max: 32}),
  //     userController.registration
  // );
  // router.post('/login', userController.login);
  // router.post('/logout', userController.logout);
  // router.get('/activate/:link', userController.activate);
  // router.get('/refresh', userController.refresh);
  // router.get('/users', authMiddleware, userController.getUsers);
}
