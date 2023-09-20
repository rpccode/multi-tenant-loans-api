import Sequelize from 'sequelize'
import { sequelizeInstance as db } from '../../../config'

const { DataTypes, Model, NOW } = Sequelize

export default class DireccionModel extends Model { }

DireccionModel.init({
    direccion_id: {
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
    descripcion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    id_ciudad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ciudad',
            key: 'ciudad_id'
        }
    },
    id_provincia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'provincia',
            key: 'provincia_id'
        }
    },
    id_pais: {
        type: DataTypes.CHAR(3),
        allowNull: false,
        references: {
            model: 'pais',
            key: 'pais_id'
        }
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estados',
            key: 'estado_id'
        },
        defaultValue: 1

    }
}, {
    sequelize: db,
    modelName: 'direccion',
    schema: 'public',
    indexes: [
        {
            name: "direccion_pkey",
            unique: true,
            fields: [
                { name: "direccion_id" },
            ]
        },
    ]
});

