import authService from "./Auth.service"



const authController = {}

authController.CreateTenant = [
    async (req, res, next) => {
        try {
            const resp = await authService.registerTenant({ ...req.body })
            res.status(200).json(resp)

        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    }
]
authController.LoginUser = [
    async (req, res, next) => {
        try {
            const resp = await authService.login({ ...req.body })
            res.status(200).json(resp)

        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    }
]

authController.createUser = [
    async (req, res, next) => {
        // console.log(req.user.tenantId)
        try {
            const resp = await authService.createUser({ ...req.body }, req.user.tenantId)
            res.status(200).json(resp)

        } catch (error) {
            res.status(400).json({ msg: error.message })
        }
    }
]


export default authController