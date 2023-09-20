import Sequelize from 'sequelize'
import { sequelizeInstance as db } from '../../../config'
const { DataTypes, Model, NOW } = Sequelize

export default class ProvinciaModel extends Model { }

ProvinciaModel.init({
    provincia_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    pais_id: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        references: {
            model: 'pais',
            key: 'pais_id'
        }
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    sequelize: db,
    modelName: 'provincia',
    schema: 'public',
    indexes: [
        {
            name: "provincia_pkey",
            unique: true,
            fields: [
                { name: "provincia_id" },
            ]
        },
    ]
});

