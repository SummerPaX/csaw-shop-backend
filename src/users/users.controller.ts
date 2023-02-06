import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { map } from 'rxjs'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'department', required: false })
  @ApiQuery({ name: 'level', required: false })
  @ApiOperation({
    summary: 'Returns all users',
    description:
      'Returns all users in a paginated list, filter by department and/or level',
  })
  getAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('department') department?: string,
    @Query('level') level?: string,
  ) {
    if (page == null || !limit) {
      page = '1'
      limit = '10'
      // throw new HttpException('Invalid arguments', HttpStatus.BAD_REQUEST);
    }

    const delayTime = 0

    return this.usersService
      .getAll({
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        department: department?.toLowerCase(),
        level: level?.toLowerCase(),
      })
      .pipe(
        map((result) => {
          return {
            duration: delayTime / 1000,
            ...result,
          }
        }),
      )
  }
}
