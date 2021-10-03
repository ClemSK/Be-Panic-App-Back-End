// Link this to the relevant model
import Product from '../models/product.js'

// [C] We need to be able to create a review
async function createReview(req, res, next) {
  const reviewData = req.body
  const { id } = req.params

  try {
    const products = await Product.findById(id)

    if (!product) {
      return res.status(404).send({ message: 'Not found' })
    }

    // Create a variable to the new review that spreads in req.body, and includes the users information
    const newReview = {
      ...req.body,
      createdBy: req.currentUser,
    }

    product.reviews.push(reviewData)

    const savedProduct = await product.save()

    res.send(savedProduct)
  } catch (err) {
    next(err)
  }
}

// [U] We need to be able to update a review
async function updateReview(req, res, next) {
  const { reviewId, id } = req.params

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).send({ message: 'Not found' })
    }

    if (!review.createdBy.equals(req.currentUser._id)) {
      return res
        .status(401)
        .send({ message: 'You are not authorized to take this action' })
    }

    const review = product.reviews.id(reviewId)

    review.set(req.body)

    const savedProduct = await product.save()

    res.send(savedProduct)
  } catch (err) {
    next(err)
  }
}

// [D] We need to be able to delete a review
async function deleteReview(req, res, next) {
  const { reviewId, id } = req.params

  try {
    const product = await Product.findById(id)

    if (!product) {
      return res.status(404).send({ message: 'Not found' })
    }

    if (!review.createdBy.equals(req.currentUser._id)) {
      return res
        .status(401)
        .send({ message: 'You are not authorized to take this action' })
    }

    const review = product.reviews.id(reviewId)

    review.remove()

    const savedProduct = await product.save()

    res.send(savedProduct)
  } catch (err) {
    next(err)
  }
}

// Each function must be exported

export default {
  createReview,
  updateReview,
  deleteReview,
}
