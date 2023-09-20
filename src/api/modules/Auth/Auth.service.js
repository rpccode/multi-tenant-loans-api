
import suscriptionRepo from "./repo/suscription.repo";
import tenantRepo from "./repo/tenant.repo";
import userRepo from "./repo/user.repo";


const authService = {}
/**
 * Registra un inquilino y crea una cuenta de usuario.
 * @param {Object} data - Datos del inquilino y usuario a registrar.
 * @param {string} data.email - Correo electrónico del usuario.
 * @param {string} data.schemaName - Nombre del esquema del inquilino.
 * @param {string} data.fullname - Nombre completo del usuario.
 * @param {string} data.password - Contraseña del usuario (se almacena con hash).
 * @returns {Object} - Objeto con un mensaje de éxito.
 */

authService.registerTenant = async function (data) {
    try {

        // Verificar si el usuario ya está registrado
        const exist = await userRepo.verifyAlreadyExist(data.email);
        // console.log(exist.ok)
        if (exist.ok) return { msg: exist.msg };
        // Registrar la cuenta de usuario inquilino
        const { ok, msg, AccountId } = await userRepo.createAccount(data);
        if (!ok) return { msg: msg };
        // console.log()

        // Registrar la huella del esquema del inquilino y vincular al usuario
        const { tenantId } = await tenantRepo.registerTenant(data.schemaName);
        // console.log({ tenantId })
        const { user } = await userRepo.createUser(data, tenantId)
        console.log(user)
        // Vincular al usuario al esquema creado
        const subscribe = await suscriptionRepo.generateSuscription(AccountId, data.plan, data.tipo);
        // console.log(subscribe)
        if (!subscribe) {
            // Si no se pudo generar la suscripción, hacer rollback y retornar
            return { ok: false, msg: "Subscription could not be generated" };
        }
        return { ok: true, msg: 'Tenant has been registered successfully', user };
    } catch (error) {
        console.log(error)
        // Manejar el error aquí
        throw error;
    }
}

authService.createUser = async (data, tenant) => {
    try {
        const { ok, msg, user } = await userRepo.createUser(data, tenant)
        if (!ok) return { ok: false, msg }

        return { ok: true, user }
    } catch (error) {
        console.log(error)
        return { ok: false, msg: error.message }
    }
}

authService.login = async (data) => {
    try {
        const { email, password } = data;

        const { ok, token, msg } = await userRepo.singIn(email, password)
        if (!ok) return { ok: false, msg }

        return { ok, token };
    } catch (error) {
        console.error(error);
        return { ok: false, msg: 'Error en el servidor' };
    }
}

export default authService