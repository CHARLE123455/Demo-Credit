import { Request, Response } from 'express';
import { registerUser } from '../services/userService';
import { fundAccount, transferFunds, withdrawFunds } from '../services/transactionService';

export const createUser = async (req: Request, res: Response) => {
    const { username, email } = req.body;
    try {
        const user = await registerUser(username, email);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: "400 Error" });
    }
};

export const fundUserAccount = async (req: Request, res: Response) => {
    const { user_id, amount } = req.body;
    try {
        await fundAccount(user_id, amount);
        res.status(200).json({ message: 'Account funded successfully' });
    } catch (error) {
        res.status(400).json({ error: "400 Error" });
    }
};

export const transferUserFunds = async (req: Request, res: Response) => {
    const { from_user_id, to_user_id, amount } = req.body;
    try {
        await transferFunds(from_user_id, to_user_id, amount);
        res.status(200).json({ message: 'Funds transferred successfully' });
    } catch (error) {
        res.status(400).json({ error: "400 Error" });
    }
};

export const withdrawUserFunds = async (req: Request, res: Response) => {
    const { user_id, amount } = req.body;
    try {
        await withdrawFunds(user_id, amount);
        res.status(200).json({ message: 'Funds withdrawn successfully' });
    } catch (error) {
        res.status(400).json({ error: "400 Error" });
    }
};
