import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      throw new ConflictException('Email already exists');
    }
    await this.usersService.create(createUserDto);

    return { message: 'Registration successful. Please log in.' };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, pass: string) {
    const user = await this.validateUser(email, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      roles: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      message: 'Login successful',
    };
  }

  async validateUserForToken(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user; // ignore password field for sending
    return result;
  }

  async generateToken(user: User): Promise<string> {
    const payload = { email: user.email, sub: user.id, roles: user.role }; // Includes roles to token payload
    return this.jwtService.sign(payload);
  }
}
