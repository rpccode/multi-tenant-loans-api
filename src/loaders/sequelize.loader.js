// import { TenantModel, TenantUserModel, UserAccountModel } from "../auth/models"

import { CiudadModel, DireccionModel, EstadosModel, PaisModel, PayPalOrderModel, PayPalTransactionModel, PlanModel, Plan_caracteristicasModel, PrestatarioModel, ProvinciaModel, RolModel, ScheduledPaymentModel, SuscripcionModel, TenantModel, UserModel } from "../api/models";



/**
 * Define asociaciones entre modelos Sequelize y sincroniza la base de datos.
 * @param {Object} sequelizeInstance - Instancia de Sequelize.
 */
export default async function sequelizeLoader(sequelizeInstance) {
    try {
        // Verifica que la instancia de Sequelize no sea nula o indefinida
        if (!sequelizeInstance) throw new Error('Error, sequelize instance is null or undefined')

        // ASSOCIATIONS
        // console.log('squelizerloader');
        // TENANT MODEL
        // Define la relación entre UserModel y TenantModel
        UserModel.belongsTo(TenantModel, {
            foreignKey: 'tenant_id', // Campo que representa la relación
            as: 'tenant', // Alias para la relación
            onDelete: 'CASCADE', // Acción en cascada cuando se elimina un inquilino
        });
        UserModel.belongsTo(RolModel, {
            foreignKey: 'rol', // Campo que representa la relación en UserModel
            as: 'user_role', // Alias para la relación
            onDelete: 'SET NULL', // Acción cuando se elimina un rol
        });
        SuscripcionModel.hasMany(ScheduledPaymentModel, { foreignKey: 'suscripcion_id' });
        SuscripcionModel.hasMany(PayPalTransactionModel, { foreignKey: 'suscripcion_id' });
        SuscripcionModel.hasMany(PayPalOrderModel, { foreignKey: 'suscripcion_id' });
        PlanModel.hasMany(Plan_caracteristicasModel, { foreignKey: 'plan_id' });

        PrestatarioModel.belongsTo(DireccionModel, { as: "direccion_direccion", foreignKey: "direccion" });
        DireccionModel.hasMany(PrestatarioModel, { as: "prestatarios", foreignKey: "direccion" });

        DireccionModel.belongsTo(EstadosModel, { as: "estado_estado", foreignKey: "estado" });
        EstadosModel.hasMany(DireccionModel, { as: "direccions", foreignKey: "estado" });

        PrestatarioModel.belongsTo(EstadosModel, { as: "estado_estado", foreignKey: "estado" });
        EstadosModel.hasMany(PrestatarioModel, { as: "prestatarios", foreignKey: "estado" });

        ProvinciaModel.belongsTo(PaisModel, { as: "pai", foreignKey: "pais_id" });
        PaisModel.hasMany(ProvinciaModel, { as: "provincia", foreignKey: "pais_id" });


        CiudadModel.belongsTo(ProvinciaModel, { as: "provincium", foreignKey: "provincia_id" });
        ProvinciaModel.hasMany(CiudadModel, { as: "ciudads", foreignKey: "provincia_id" });

        await sequelizeInstance.sync({ alter: false })
            .then(async () => {
                console.log('Connection to db has been succesful')
            })
            .catch(err => console.error(err))
    } catch (error) {
        console.log(error)
    }
}