import Product from '../models/product.js'
import { connectDb, truncateDb, disconnectDb } from './helpers.js'
import productSeedData from './productSeedData.js'

async function seed() {
  try {
    await connectDb()
    console.log('Connected to Database')

    await truncateDb()
    console.log('Database dropped')

    const movies = await Product.create(productSeedData)
    console.log(`${product.length} movies added to the database`)

    console.log('Good Bye')
  } catch (err) {
    console.log('Something went wrong with database')
  }

  disconnectDb()
}

seed()
