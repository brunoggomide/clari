import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', verifyToken, (req, res) => {
    const userId = (req as any).userId;
    res.json({ message: `Usuário autenticado com ID ${userId}` });
});

export default router;
