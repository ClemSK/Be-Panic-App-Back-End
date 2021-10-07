// this is the function that only give access to certain role
export function authRole(permitedRole) {
  return (req, res, next) => {
    if (!req.currentUser) {
      res.status(404).send({
        message: 'No user !',
      })
    }

    if (req.currentUser.role === permitedRole) {
      next()
    } else {
      res.status(403).send({
        message: 'Forbidden',
      })
    }
  }
}
