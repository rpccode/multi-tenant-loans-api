import Sequelize from 'sequelize'
import { sequelizeInstance as db } from '../../../config'

const { DataTypes, UUIDV4, Model, NOW } = Sequelize

export default class UserModel extends Model { }

UserModel.init({
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
        defaultValue: UUIDV4
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tenant',
            key: 'id'
        }
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rol',
            key: 'rol_id'
        }
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW()
    }
}, {
    sequelize: db,
    modelName: 'user',
    schema: 'public',
    indexes: [
        {
            name: "usuario_pkey",
            unique: true,
            fields: [
                { name: "user_id" },
            ]
        },
    ]
})