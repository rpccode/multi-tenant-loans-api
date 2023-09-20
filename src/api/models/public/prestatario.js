import Sequelize from 'sequelize'
import { sequelizeInstance as db } from '../../../config'

const { DataTypes, Model, NOW } = Sequelize

export default class PrestatarioModel extends Model { }

PrestatarioModel.init({
    prestatario_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tenant',
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    apellido: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    correo_electronico: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },
    direccion: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'direccion',
            key: 'direccion_id'
        }
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'estados',
            key: 'estado_id'
        },
        defaultValue: 1
    }
}, {
    sequelize: db,
    modelName: 'prestatario',
    schema: 'public',
    indexes: [
        {
            name: "prestatario_pkey",
            unique: true,
            fields: [
                { name: "prestatario_id" },
            ]
        },
    ]
});
