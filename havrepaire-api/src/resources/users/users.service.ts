import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = new this.userModel(createUserDto);
      const createdUser = await user.save();
      if (!user) throw new BadRequestException(createdUser, `User could not be created !`);
      return createdUser;
    } catch (e) {
      throw new Error (`Oups, user could not be created: ${e}`);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (e) {
      throw new Error (`Oups, users could not be loaded: ${e}`);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(new ObjectId(id)).exec();
      if (!user) throw new NotFoundException(`User with id ${id} was not found !`);
      return user;
    } catch (e) {
      throw new Error (`Oups, user could not be found: ${e}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      await this.userModel.findByIdAndUpdate(new ObjectId(id), updateUserDto).exec();
      const updatedUser = await this.userModel.findById(new ObjectId(id)).exec();
      return updatedUser;
    } catch (e) {
      throw new Error (`Oups, user could not be updated: ${e}`);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(new ObjectId(id)).exec();
      return deletedUser;
    } catch (e) {
      throw new Error (`Oups, user could not be deleted: ${e}`);
    }
  }
}
