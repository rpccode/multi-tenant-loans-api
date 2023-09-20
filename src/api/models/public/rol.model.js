import Sequelize from 'sequelize'
import { sequelizeInstance as db } from '../../../config'

const { DataTypes, Model, NOW } = Sequelize

export default class RolModel extends Model { }

RolModel.init({
    rol_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}, {
    sequelize: db,
    modelName: 'rol',
    schema: 'public',
    indexes: [
        {
            name: "rol_pkey",
            unique: true,
            fields: [
                { name: "rol_id" },
            ]
        },
    ]
});

