import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { last_name: 'ASC', first_name: 'ASC', nick_name: 'ASC' }, //sorting order
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with such email already exists');
    }
    const user = this.userRepository.create(createUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.save(user);
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User id ${userId} was not found`);
    }
    // Hash the new password if it's being updated
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    // Merge the updated fields into the existing user
    this.userRepository.merge(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User id ${userId} was not found`);
    }
    try {
      await this.userRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
