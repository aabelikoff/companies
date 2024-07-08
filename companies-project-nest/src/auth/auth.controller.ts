import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
  Patch,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from './jwt-payload.interface';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    try {
      return this.authService.signUp(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new BadRequestException('Email already exists');
      } else {
        throw new InternalServerErrorException('Registration failed');
      }
    }
  }

  @Post('signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    try {
      return this.authService.login(email, password);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: Request) {
    try {
      const jwtPayload = req.user as JwtPayload;
      const user = await this.usersService.findByEmail(jwtPayload.email);
      delete user.password;
      return { ...user, message: 'Profile fetched successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch profile');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile/update')
  async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    try {
      const jwtPayload = req.user as JwtPayload;
      const userId = jwtPayload.sub;
      const updatedUser = await this.usersService.update(userId, updateUserDto);
      const newToken = await this.authService.generateToken(updatedUser);
      delete updatedUser.password;
      return {
        user: updatedUser,
        access_token: newToken,
        message: 'Profile updated successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update profile');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('logout')
  async logout() {
    // For JWT logout just sends a simple message
    return { message: 'Logout successful' };
  }
}
