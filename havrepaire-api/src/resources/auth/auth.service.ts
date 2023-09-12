import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) { }

    async login(loginAuthDto: LoginAuthDto) {
        const {
            username,
            password
        } = loginAuthDto;
        if (!username) throw new NotAcceptableException(`User must enter a username.`);
        if (!password) throw new NotAcceptableException(`User must enter a password.`);
        try {
            const user = await this.userModel.findOne({ username });
            if (!user) throw new NotFoundException(`Oups, user with username ${username} was not found !`);

            const payload = { _id: user._id, username: user.username, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        } catch (e) {
            throw new Error(`Could not login user with username ${username}: ${e}`);
        }
    }
}


