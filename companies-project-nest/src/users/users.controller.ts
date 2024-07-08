import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Delete,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.Admin) // Access is only for admins
  async findAll(): Promise<User[]> {
    try {
      return this.usersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  @Post()
  @Roles(Role.Admin) // Access is only for admins
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.create(createUserDto);
      newUser.password = '';
      return {
        message: 'User was successfully created',
        newUser,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('User already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Patch(':id')
  @Roles(Role.Admin) // Access is only for admins
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.usersService.update(id, updateUserDto);
      updatedUser.password = '';
      return {
        message: 'User updated successfully',
        updatedUser,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User was not found');
      }
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  @Delete(':id')
  @Roles(Role.Admin) // Access is only for admins
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.usersService.remove(id);
      return { message: 'User has been deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User was not found');
      }
      throw new InternalServerErrorException('Failes to delete company');
    }
  }
}
