import express from 'express'
import productController from '../controllers/productController.js'

const router = express.Router()

router
  .route('/product')
  .get(productController.getAllProducts)
  .post(productController.createProduct)

export default router
