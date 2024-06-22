import axios from 'axios';

export const checkKarmaBlacklist = async (email: string): Promise<boolean> => {
    const response = await axios.get(`https://api.lendsqr.com/karma?email=${email}`, {
        headers: { 'Authorization': `Bearer ${process.env.LENDSQLR_ADJUTOR_API_KEY}` }
    });
    return response.data.isBlacklisted;
};
