import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token !== 'faux-token') {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
};
