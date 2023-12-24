import { Controller, Post } from '@nestjs/common';

@Controller({
  version: '1',
  path: '/user',
})
export class UserController {
  @Post('/signup')
  create() {
    return {oba: 'he'}
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
