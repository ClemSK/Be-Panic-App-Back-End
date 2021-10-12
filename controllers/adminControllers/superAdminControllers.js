import User from '../../models/user.js'

// getting all user data
async function getAllUser(_req, res, next) {
  try {
    const users = await User.find()

    if (!users) {
      return res.status(404).send({
        message: 'Users not found',
      })
    }

    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

// get single user
async function getSingleUser(req, res, next) {
  const { id } = req.params
  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      })
    }

    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

// deleting user
async function deleteUser(req, res, next) {
  const { id } = req.params
  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      })
    }

    await user.remove()

    return res.status(200).send({
      message: 'User deleted',
    })
  } catch (err) {
    next(err)
  }
}

export default {
  getAllUser,
  deleteUser,
  getSingleUser,
}
