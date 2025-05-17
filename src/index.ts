import express from 'express';
import { sequelize } from './config/database';
import './models/user.model';
import authRoutes from './routes/auth.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conectado ao banco com sucesso');

        await sequelize.sync({ alter: true });
        console.log('✅ Tabelas sincronizadas');
    } catch (error) {
        console.error('❌ Erro ao conectar no banco:', error);
    }

    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
