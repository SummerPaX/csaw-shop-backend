import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { PublicUser, UsersService } from '../users/users.service'
import { SignUpDto } from './dto/sign-up.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { SignInDto } from './dto/sign-in.dto'
import { SignInResponseDto } from './dto/sign-in-response.dto'
import { CheckEmailDto } from './dto/check-email.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({
    summary: 'Logs in the user',
    description:
      'Use the following user to log in:<br><b>Username:</b> admin<br><b>Password:</b> admin',
  })
  @ApiCreatedResponse({ type: SignInResponseDto })
  async login(@Request() req, @Body() body: SignInDto) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logs out the user',
    description: 'Dummy Log Out Endpoint (Does nothing!)',
  })
  @Get('logout')
  async logout() {
    // Do nothing
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({
    summary: 'Gets the Profile of the current User',
    description: '',
  })
  @ApiOkResponse({
    type: PublicUser,
  })
  getProfile(@Request() req) {
    return this.userService.findOneById(req.user.userId)
  }

  @Post('sign-up')
  @ApiOperation({
    summary: 'Create new user',
    description: 'Crete a new User with username and Password',
  })
  signUp(@Body() signUp: SignUpDto) {
    return this.userService.create(signUp)
  }

  @Get('check-email')
  @ApiOperation({
    summary: 'Checks if email is available',
    description:
      'Returns available true or false depending on the status of the email',
  })
  @ApiOkResponse({
    type: CheckEmailDto,
  })
  checkEmail(@Query('email') email: string): CheckEmailDto {
    return {
      available: this.userService.emailAvailable(email),
    }
  }
}
