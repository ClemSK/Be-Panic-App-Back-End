import { MongoDriverError } from 'mongodb'
import Product from '../models/product.js'

async function getAllProducts(_req, res, next) {
  try {
    const product = await Product.find()
    return res.status(200).json(product)
  } catch (err) {
    next(err)
  }
}

async function createProduct(req, res, next) {
  try {
    newProduct = await Product.create({
      ...req.body,
      createdBy: req.currentUser,
    })
    // here we can put the updateMany if needed
    return res.status(201).send(newProduct)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllProducts,
  createProduct,
}
