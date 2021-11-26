import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin', 'super admin'],
  },
})

// encrypting password
userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseUniqueValidator)

userSchema.plugin(mongooseHidden({ defaultHidden: { password: true } }))

const User = mongoose.model('User', userSchema)

export default User
