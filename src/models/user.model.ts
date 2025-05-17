import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password_hash: string | null;
    google_id: string | null;
    timezone: string;
    plan: 'free' | 'pro';
    plan_expiration: Date | null;
    stripe_customer_id: string | null;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'password_hash' | 'google_id' | 'plan' | 'plan_expiration' | 'stripe_customer_id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password_hash!: string | null;
    public google_id!: string | null;
    public timezone!: string;
    public plan!: 'free' | 'pro';
    public plan_expiration!: Date | null;
    public stripe_customer_id!: string | null;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    google_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    timezone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    plan: {
        type: DataTypes.ENUM('free', 'pro'),
        defaultValue: 'free',
    },
    plan_expiration: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    stripe_customer_id: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});
