import { User } from '../user.entity';

export class UserDto {
    id: string;

    readonly userName: string;

    constructor(user: User) {
        this.id = user.id;
        this.userName = user.userName;
    }
}
