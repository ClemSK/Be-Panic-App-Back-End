import dotenv from 'dotenv'

import Product from '../models/product.js'
import User from '../models/user.js'
import { connectDb, truncateDb, disconnectDb } from './helpers.js'
import { productSeedData } from './productSeedData.js'

dotenv.config()

async function seed() {
  try {
    // Connecting the local data base
    await connectDb()
    console.log('Connected to Database')

    await truncateDb()
    console.log('Database dropped')

    // creating a super admin acc to add the initial seeds of data
    const userSuperUser = await User.create({
      username: 'nghengdi',
      email: 'nghengdi@gmail.com',
      password: '12345678',
      role: 'super admin',
    })

    //this is to find the super admin in the databases
    const findUser = await User.findOne({ email: 'nghengdi@gmail.com' })
    console.log(findUser)
    // this part is to add the seeds data to have the createdby part
    const newProductSeed = productSeedData.map((seed) => {
      return {
        ...seed,
        createdBy: findUser,
      }
    })

    // checking the product seed occurs before adding to the data base
    if (newProductSeed) {
      // adding seed data into the database
      const product = await Product.create(newProductSeed)

      console.log(`${product.length} product added to the database`)

      console.log(product)

      console.log('Good Bye')
    }
  } catch (err) {
    console.log('Something went wrong with database :' + err)
  }

  disconnectDb()
}

seed()
