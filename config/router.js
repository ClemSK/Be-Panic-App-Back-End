import express from 'express'
import productController from '../controllers/productController.js'
import userController from '../controllers/userController.js'

// middleware
import secureRoute from '../middleware/secureRoute.js'
import { authRole } from '../middleware/rolePermission.js'

const Router = express.Router()

Router.route('/product')
  .get(productController.getAllProducts)
  .post(secureRoute, authRole('admin'), productController.createProduct)

Router.route('/product/:id')
  .get(productController.getSingleProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)

// Route for creating reviews
Router.route('/product/:id/review').post(reviewController.createReview)

Router.route('/product/:id/review/:reviewid')
  .put(reviewController.updateReview) // will need to add secureRoute as this will be locked to customer
  .delete(reviewController.deleteReview) // will need to add secureRoute as this will be locked to customer

// register and login controller
Router.route('/register').post(userController.registerUser)

Router.route('/login').post(userController.loginUser)

export default Router
