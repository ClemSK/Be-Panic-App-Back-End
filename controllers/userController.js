import User from '../models/user.js'
import jwt from 'jsonwebtoken'

// Registering
async function registerUser(req, res, next) {
  try {
    // getting user information and create it in database
    const newUser = await User.create(req.body)

    return res.status(201).send(newUser)
  } catch (err) {
    next(err)
  }
}

// Login user
async function loginUser(req, res, next) {
  try {
    // finding user
    const user = await User.findOne({ email: req.body.email })

    // checking whether user exist
    if (!user) {
      return res.status(404).send({
        message: 'User not found.',
      })
    }

    // checking whether user password correct
    if (!user.validatePassword(req.body.password)) {
      return res.status(401).send({
        message: 'Unauthorized',
      })
    }

    // making a n access token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET,
      {
        expiresIn: '12h',
      }
    )

    return res.status(200).send({
      token,
      message: 'Login successfully !',
    })
  } catch (err) {
    next(err)
  }
}

export default {
  registerUser,
  loginUser,
}
