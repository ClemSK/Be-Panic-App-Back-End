import mongoose from 'mongoose'

const connectDb = () => {
  return mongoose.connect(process.env.DB_URI)
}

export default connectDb
