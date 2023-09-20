import { TenantModel } from "../../../models"



const tenantRepo = {}

tenantRepo.registerTenant = async (schemaName) => {
    try {
        const tenant = await TenantModel.create({ schema_name: schemaName })
        return { ok: true, tenantId: tenant.id }
    } catch (error) {
        console.log(error)
        return null
    }
}








export default tenantRepo;