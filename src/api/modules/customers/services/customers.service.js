import { DireccionModel, PrestatarioModel } from "../../../models"
import direccionService from "./direccion.service"



const customerService = {}


customerService.create = async (body, tenantId) => {
    try {
        const direccionBody = body.direccion
        // console.log(body);
        // console.log(direccionBody);
        const direccion = await direccionService.create(direccionBody, tenantId)

        if (direccion.ok !== true) return { ok: direccion.ok, msg: direccion.msg }

        let customerDTO = {
            tenant_id: tenantId,
            nombre: body.nombre,
            apellido: body.apellido,
            correo_electronico: body.correo_electronico,
            direccion: direccion.data.direccion_id,
            estado: body.estado
        }
        const customer = await PrestatarioModel.create(customerDTO)
        if (!customer) return { ok: false, msg: 'No se pudo Crear El cliente.' }

        return { ok: true, customer }
    } catch (error) {
        console.log(error);
        return { ok: false, msg: '' }

    }
}

customerService.findAll = () => {
    return `This action returns all tenant`;
}

customerService.findOne = (id) => {
    return `This action returns a #${id} tenant`;
}

customerService.update = (id, updateCustomerDto) => {
    return `This action updates a #${id} tenant`;
}

customerService.remove = (id) => {
    return `This action removes a #${id} tenant`;
}








export default customerService;