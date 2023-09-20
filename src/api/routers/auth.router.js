import { Router } from 'express'
import authController from '../modules/Auth/Auth.controller'
import authenticateMiddleware from '../modules/Auth/Middleware/auth.middleware'
// import authController from '../../auth/controllers/auth.controller


const authRouter = Router()

authRouter.post('/tenant', authController.CreateTenant)
authRouter.post('/sing-in', authController.LoginUser)
authRouter.post('/sing-up', authenticateMiddleware, authController.createUser)



export default authRouter