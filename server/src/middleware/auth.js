import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || ''
  const [, token] = header.split(' ')
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    return next()
  } catch (_error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  return next()
}
