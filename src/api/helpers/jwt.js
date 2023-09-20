import jwt from 'jsonwebtoken'
import { config } from '../../config';


const generatetoken = (user) => {
    // Generar un token de acceso
    const payload = {
        userId: user.user_id, // El ID del usuario autenticado
        tenantId: user.tenant_id, // El ID del inquilino
        // Otras propiedades personalizadas si es necesario
    };


    const accessToken = jwt.sign(payload, config.TOKEN_SECRET, {
        expiresIn: '1h', // Tiempo de expiración del token (ejemplo: 1 hora)
    });
    return accessToken;
}

export default generatetoken;