import { Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from '../users/schemas/user.schema';

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
            // check if user exists
            const user = await this.userModel
                .findOne({ username })
                .select('-email')
                .select('-id');
            if (!user) throw new NotFoundException(`Oups, user with username ${username} was not found !`);
            // check password
            const isMatch = await bcrypt.compare(password, user.hash);
            if (!isMatch) throw new UnauthorizedException(`Password does not match user's password in the database.`);
            // generate and return authentication token
            const payload = { _id: user._id, username: user.username, role: user.role };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };

        } catch (e) {
            throw new Error(`Could not login user with username ${username}: ${e}`);
        }
    }
}


