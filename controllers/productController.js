import Product from '../models/product.js'

async function getAllProducts(_req, res, next) {
  try {
    const products = await Product.find()

    if (!products) {
      return res.status(404).send({
        message: 'Products not found',
      })
    }

    return res.status(200).json(products)
  } catch (err) {
    next(err)
  }
}

async function getSingleProduct(req, res, next) {
  const { id } = req.params

  try {
    const singleProduct = await Product.findById(id)

    if (!singleProduct) {
      return res.status(404).send({
        message: 'Product not found',
      })
    }

    return res.send(singleProduct)
  } catch (err) {
    next(err)
  }
}

async function searchProducts(req, res, next) {
  try {
    const { q } = req.query
    console.log('The search Q is: ', q)
    const regex = new RegExp(q, 'i')

    const query = Product.find()
    query.where({
      $or: [{ title: regex }, { description: regex }],
    })

    const products = await query

    console.log('Search result for product is: ', products)
    return res.status(200).json(products)
  } catch (err) {
    next(err)
  }
}

// only admin able to create product
async function createProduct(req, res, next) {
  try {
    const newProduct = await Product.create({
      ...req.body,
      createdBy: req.currentUser,
    })

    // here we can put the updateMany if needed
    return res.status(201).send(newProduct)
  } catch (err) {
    next(err)
  }
}

async function updateProduct(req, res, next) {
  const { id } = req.params
  const { body } = req

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(401).send({ message: 'Product not found' })
    }

    // this is checking to make sure only the creator can edit the profile
    if (!product.createdBy.equals(req.currentUser._id)) {
      return res
        .status(403)
        .send({ message: 'You are not authorized to perform the task.' })
    }

    // setting the user input data
    product.set(body)

    // saving the data
    const savedProduct = await product.save()

    return res.status(200).json(savedProduct)
  } catch (err) {
    next(err)
  }
}

async function deleteProduct(req, res, next) {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(401).send({ message: 'Product does not exist' })
    }

    // checking only creator can delete the product and the super admin
    if (
      !product.createdBy.equals(req.currentUser._id) &&
      req.currentUser.role !== 'super admin'
    ) {
      return res
        .status(403)
        .send({ message: 'You are not authorized to perform the task.' })
    }

    // removing product
    await product.remove()

    return res.status(200).send({
      message: 'Product removed',
    })
  } catch (err) {
    next(err)
  }
}

export default {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
}
