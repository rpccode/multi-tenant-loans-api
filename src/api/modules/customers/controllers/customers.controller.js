import customerService from "../services/customers.service";



const customerController = {}


customerController.create = async (req, res) => {
    const { tenantId } = req.user
    try {
        const resp = await customerService.create({ ...req.body }, tenantId)
        res.status(200).json(resp)
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: error.message })
    }
}

customerController.findAll = async (req, res) => {
    return await customerService.findAll()
}

customerController.findOne = async (req, res) => {
    const { id } = req.params
    return await customerService.findOne(id)
}

customerController.update = async (req, res) => {
    const { id } = req.params
    const updateCustomerDto = req.body
    return await customerService.update(id, updateCustomerDto)
}

customerController.remove = async (req, res) => {
    const { id } = req.params
    return await customerService.remove(id)
}










export default customerController;