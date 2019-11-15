import { Market } from './market';
import { User } from './user';

export class Favorite {
    _id: string;
    user: User;
    markets: Market[];
    createdAt: string;
    updatedAt: string;
}
