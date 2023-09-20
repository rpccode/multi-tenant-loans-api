import { DireccionModel } from "../../../models";




const direccionService = {}

direccionService.create = async (body, tenantId) => {
    // console.log(body)
    try {
        const dirDTO = {
            tenant_id: tenantId,
            descripcion: body.descripcion,
            id_ciudad: body.ciudad,
            id_provincia: body.provincia,
            id_pais: body.pais,
            estado: body.estado
        }
        const resp = await DireccionModel.create(dirDTO)
        if (!resp) return { ok: false, msg: 'No se pudo  Crear la DIreccion ' }

        return { ok: true, data: resp.dataValues }
    } catch (error) {
        console.log(error)
        return { ok: false, msg: 'Error al crear la direccion ' }
    }
}
















export default direccionService;