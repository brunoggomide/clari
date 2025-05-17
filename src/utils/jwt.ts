import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET ?? '';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? '';

const accessOptions: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
};

const refreshOptions: SignOptions = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};

export function generateAccessToken(userId: number): string {
    return jwt.sign({ userId }, JWT_SECRET, accessOptions);
}

export function generateRefreshToken(userId: number): string {
    return jwt.sign({ userId }, JWT_REFRESH_SECRET, refreshOptions);
}
