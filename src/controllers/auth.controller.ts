import { Request, Response } from 'express';
import { login, register } from '../services/auth.service';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, timezone } = req.body;

        if (!name || !email || !password || !timezone) {
            res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
            return;
        }

        const result = await register({ name, email, password, timezone });

        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'E-mail e senha obrigatórios.' });
            return;
        }

        const result = await login({ email, password });

        res.status(200).json(result);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};
