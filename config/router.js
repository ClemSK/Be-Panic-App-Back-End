import express from 'express'

// controller
import productController from '../controllers/productController.js'
import userController from '../controllers/userController.js'
import reviewController from '../controllers/reviewController.js'
import superAdminController from '../controllers/adminControllers/superAdminControllers.js'
import adminController from '../controllers/adminControllers/adminController.js'

// middleware
import secureRoute from '../middleware/secureRoute.js'
import { authRole } from '../middleware/rolePermission.js'

const Router = express.Router()

Router.route('/search').get(productController.searchProducts)

// Route for products
Router.route('/product')
  .get(productController.getAllProducts)
  .post(secureRoute, authRole('admin'), productController.createProduct)

Router.route('/product/:id')
  .get(productController.getSingleProduct)
  .put(secureRoute, authRole('basic'), productController.updateProduct)
  .delete(secureRoute, authRole('admin'), productController.deleteProduct)

// Route for reviews
Router.route('/product/:id/review').post(
  secureRoute,
  authRole('basic'),
  reviewController.createReview
)

Router.route('/product/:id/review/:reviewId')
  .put(secureRoute, authRole('basic'), reviewController.updateReview) // will need to add secureRoute as this will be locked to customer
  .delete(secureRoute, authRole('basic'), reviewController.deleteReview) // will need to add secureRoute as this will be locked to customer

// Route for super admin controller
Router.route('/superAdmin').get(
  secureRoute,
  authRole('super admin'),
  superAdminController.getAllUser
)

Router.route('/superAdmin/:id')
  .get(secureRoute, authRole('super admin'), superAdminController.getSingleUser)
  .delete(secureRoute, authRole('super admin'), superAdminController.deleteUser)

// Route for admin to get access to the products
Router.route('/admin/product').get(
  secureRoute,
  authRole('admin'),
  adminController.getSellerProduct
)

// Router.route('/basket').put(productController.checkoutUpdateProduct)

// register and login controller
Router.route('/register').post(userController.registerUser)

Router.route('/login').post(userController.loginUser)

export default Router
