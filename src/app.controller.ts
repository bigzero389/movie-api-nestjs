import { Controller, Get } from '@nestjs/common';

const greetMessage = 'Welcome to Hello bigzero world(with movie api example)';

@Controller(['', '/'])
export class AppController {

  @Get()
  home() {
    return greetMessage;
  }

  @Get('/health')
  health() {
    return 'health ok';
  }
}
