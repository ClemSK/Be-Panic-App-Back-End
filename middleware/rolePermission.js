// this is the function that only give access to certain role
export function authRole(permitedRole) {
  return (req, res, next) => {
    // secure checking purpose only
    if (!req.currentUser) {
      res.status(404).send({
        message: 'No user !',
      })
    }

    // This is part where only some role needed before able to access to it
    if (
      req.currentUser.role === permitedRole ||
      req.currentUser.role === 'super admin'
    ) {
      next()
    } else {
      res.status(403).send({
        message: 'Forbidden',
      })
    }
  }
}
