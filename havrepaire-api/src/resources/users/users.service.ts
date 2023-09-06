import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    if (!user) throw new NotFoundException(`User with id ${id} was not found !`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    if (!user) throw new NotFoundException(`User with id ${id} was not found !`);
    await this.userRepository.update(
      new ObjectId(id),
      updateUserDto
    );
    const updatedUser = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    // return updatedUser;
    return updatedUser;
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userRepository.findOneBy({ _id: new ObjectId(id) });
    if (!deletedUser) throw new NotFoundException(`User with id ${id} was not found !`);
    this.userRepository.delete(new ObjectId(id));
    return deletedUser;
  }
}
