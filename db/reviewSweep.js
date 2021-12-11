import Product from '../models/product.js'
import { productSeedData } from './productSeedData.js'
import { connectDb, disconnectDb, truncateDb } from './helpers.js'

async function reviewSweep() {
  try {
    await connectDb()
    console.log('Connected')

    const allProducts = await Product.find()
  } catch (err) {
    next()
  }
}
