import express from 'express'
import productController from '../controllers/productController.js'

const router = express.Router()

router
  .route('/product')
  .get(productController.getAllProducts)
  .post(productController.createProduct)

router
  .route('/product/:id')
  .get(productController.getSingleProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct)

export default router
