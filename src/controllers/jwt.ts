import { Request, Response, NextFunction } from 'express';
import { verify, sign } from 'jsonwebtoken';

interface User {
    user_id: string,
    name: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            authenticated?: boolean;
        }
    }
}

const createToken = (user: User): string => {
    const secretKey: string = "codingCommunity";
    const token: string = sign({ username: user.name, id: user.user_id }, secretKey);
    return token;
}

const validateToken = (req: Request, res: Response, next: NextFunction): any => {
    const token: string | undefined = req.cookies["access-token"];
    const secretKey: string = "codingCommunity";
    if (!token)
        return res.status(400).json({ error: "User not authenticated" });
    try {
        const validToken = verify(token, secretKey);
        if (validToken) {
            req.authenticated = true;
            return next();
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

export { createToken, validateToken };
