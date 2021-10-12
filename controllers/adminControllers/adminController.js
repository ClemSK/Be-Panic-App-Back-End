import Product from '../../models/product.js'

// getting the creator product
async function getSellerProduct(req, res, next) {
  try {
    const products = await Product.find({ createdBy: req.currentUser._id })

    if (!products) {
      return res.status(404).send({
        message: 'No product available',
      })
    }

    return res.status(200).json(products)
  } catch (err) {
    next(err)
  }
}

export default {
  getSellerProduct,
}
