import mongoose from 'mongoose'

export const connectDb = () => {
  return mongoose.connect(process.env.DB_URI)
}

export const truncateDb = () => {
  if (mongoose.connection.readState !== 0) {
    const { collections } = mongoose.connection

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    )

    return Promise.all(promises)
  }
}

export const disconnectDb = () => {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}
