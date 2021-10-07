import mongoose from 'mongoose'
import mongooseHidden from 'mongoose-hidden'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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

userSchema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true } })
)

const User = mongoose.model('User', userSchema)

export default User
