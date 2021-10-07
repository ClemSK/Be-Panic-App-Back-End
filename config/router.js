import express from 'express'
import productController from '../controllers/productController.js'
import userController from '../controllers/userController.js'

// middleware
import secureRoute from '../middleware/secureRoute.js'
import { authRole } from '../middleware/rolePermission.js'

const router = express.Router()

router
  .route('/product')
  .get(productController.getAllProducts)
  .post(secureRoute, authRole('admin'), productController.createProduct)

router
  .route('/product/:id')
  .get(productController.getSingleProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)

// register and login controller
router.route('/register').post(userController.registerUser)

router.route('/login').post(userController.loginUser)

export default router
