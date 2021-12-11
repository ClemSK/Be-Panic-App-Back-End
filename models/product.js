import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 50 },
    text: { type: String, required: true, maxlength: 400 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
)
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  stockCount: { type: Number, required: true },
  productInfo: { type: String, required: true },
  itemDescription: { type: String, required: true },
  image: {
    height: { type: Number },
    url: { type: String, required: true },
    width: { type: Number },
  },
  review: [reviewSchema],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: false,
  },
})

productSchema.plugin(mongooseUniqueValidator)

const Product = mongoose.model('Product', productSchema)

export default Product
