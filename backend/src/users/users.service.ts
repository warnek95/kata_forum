import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { ConfigService } from '../shared/config/config.service';

@Injectable()
export class UsersService {

    constructor(
        @Inject('UsersRepository')
        private readonly usersRepository: typeof User
    ) {}

    async findAll(): Promise<UserDto[]> {
        const users = await this.usersRepository.findAll<User>();
        return users.map((user: User) => {
            return new UserDto(user);
        });
    }

    async findOne(id: number): Promise<UserDto> {
        const user = await this.usersRepository.findByPk<User>(id);
        if (!user) {
            throw new HttpException(
                'User with given id not found',
                HttpStatus.NOT_FOUND,
            );
        }

        return new UserDto(user);
    }
}
