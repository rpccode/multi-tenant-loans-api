import argon from 'argon2'
import { UserAccountModel, UserModel } from '../../../models'
import generatetoken from '../../../helpers/jwt'


const userRepo = {}

/**
 * Verifica si un usuario con el correo electrónico dado ya existe en la base de datos.
 * @param {string} email - Correo electrónico del usuario.
 */
userRepo.verifyAlreadyExist = async email => {
    const user = await UserModel.findOne({ where: { email } })
    const userAccount = await UserAccountModel.findOne({ where: { email } })

    if (user && userAccount) {
        return { ok: true, msg: "User account already exists" };
    } else {
        return { ok: false, msg: "User account does not exist" };
    }
}
/**
 * Crea una nueva cuenta de usuario con los datos proporcionados.
 * @param {Object} data - Datos del usuario a registrar.
 * @param {string} data.fullname - Nombre completo del usuario.
 * @param {string} data.email - Correo electrónico del usuario.
 * @param {string} data.password - Contraseña del usuario (se almacena con hash).
 * @returns {Object} - Objeto que contiene el ID del usuario registrado.
 */
userRepo.createAccount = async data => {
    try {
        // console.log(data)
        const userDTO = {
            schema_name: data.schemaName,
            fullname: data.fullname,
            email: data.email,
        }
        // console.log(userDTO)
        const user = await UserAccountModel.create(userDTO)
        if (!user) return { ok: false, msg: 'Error al Crear La cuenta' }

        return { ok: true, AccountId: user.id }
    } catch (error) {
        console.log(error)
        return { ok: false, msg: 'Error al Crear la Cuenta' }
    }
}
userRepo.createUser = async (data, tenant) => {

    try {
        const { ok, msg } = userRepo.verifyAlreadyExist(data.email)
        if (ok) return { ok: false, msg }

        const userDTO = {
            tenant_id: tenant,
            fullname: data.fullname,
            email: data.email,
            password: await argon.hash(data.password),
            rol: data.rol
        }

        const user = await UserModel.create(userDTO)
        if (!user) return { ok: false, msg: 'Error al Crear el Usuario' }

        return { ok: true, user: user.dataValues }
    } catch (error) {
        console.log(error)
        return { ok: false, msg: 'Error al Crear el Usuario' }
    }
}

userRepo.singIn = async (email, password) => {
    try {
        // Buscar al usuario por correo electrónico en la base de datos
        const user = await UserModel.findOne({ where: { email } });
        // console.log(user.password)
        // console.log(argon.verify(password, user.password))
        // Si el usuario no existe o la contraseña es incorrecta, devolver un error
        if (!user || !argon.verify(user.password, password)) {
            return { ok: false, msg: 'Credenciales incorrectas' }
        }

        // Generar un token JWT
        // const token = jwt.sign({ userId: user.id }, 'tu_clave_secreta', { expiresIn: '1h' });
        const token = await generatetoken(user)

        // Devolver el token al cliente
        return { ok: true, token }
    } catch (error) {
        console.log(error)
        return { ok: false, msg: ' Error al verificando las Credenciales' }
    }
}


export default userRepo