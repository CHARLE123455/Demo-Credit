import { createUser, getUserById } from '../models/userModel';
import { checkKarmaBlacklist } from '../utils/lendsqrAdjutorAPI';

export const registerUser = async (username: string, email: string) => {
    const isBlacklisted = await checkKarmaBlacklist(email);
    if (isBlacklisted) {
        throw new Error('User is blacklisted');
    }
    return createUser(username, email);
};
