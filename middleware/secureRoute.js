import jwt from 'jsonwebtoken'
import User from '../models/user.js'

async function secureRoute(req, res, next) {
  try {
    const authToken = req.headers.authorization

    if (!authToken || !authToken.startsWith('Bearer')) {
      return res
        .status(401)
        .send({ message: 'You are not authorized to perform this action' })
    }

    const token = authToken.replace('Bearer ', '')

    jwt.verify(token, process.env.SECRET, async (err, data) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      const user = await User.findById(data.userId)

      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      req.currentUser = user

      next()
    })
  } catch (err) {
    next(err)
  }
}

export default secureRoute
