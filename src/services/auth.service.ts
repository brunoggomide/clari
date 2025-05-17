import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';

interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    timezone: string;
}

export async function register(data: RegisterDTO) {
    const { name, email, password, timezone } = data;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
        throw new Error('E-mail já registrado');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password_hash,
        timezone,
    });

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            timezone: user.timezone,
            plan: user.plan,
        },
        accessToken,
        refreshToken,
    };
}

interface LoginDTO {
    email: string;
    password: string;
}

export async function login(data: LoginDTO) {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });
    if (!user || !user.password_hash) {
        throw new Error('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            timezone: user.timezone,
            plan: user.plan,
        },
        accessToken,
        refreshToken,
    };
}
