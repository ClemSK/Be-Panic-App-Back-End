import Product from '../models/product.js'

async function getAllProducts(_req, res, next) {
  try {
    const product = await Product.find()
    return res.status(200).json(product)
  } catch (err) {
    next(err)
  }
}

async function getSingleProduct(req, res, next) {
  const { id } = req.params

  try {
    const singleProduct = await Product.findById(id)

    return res.send(singleProduct)
  } catch (err) {
    next(err)
  }
}

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

    //   can add in user id for giving admin permission for updating

    // if there are linked products like with actors and movies we can add it here
    // with the updateMany

    product.set(req.body)
    const savedProduct = product.save()

    res.status(200).json(product)
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

    await product.remove()

    return res.status(200).json(product)
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
}
