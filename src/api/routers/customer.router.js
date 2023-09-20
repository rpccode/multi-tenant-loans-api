import { Router } from 'express'

import authenticateMiddleware from '../modules/Auth/Middleware/auth.middleware'
import customerController from '../modules/customers/controllers/customers.controller'
// import authController from '../../auth/controllers/auth.controller


const customerRouter = Router()

customerRouter.post('/', authenticateMiddleware, customerController.create)



export default customerRouter