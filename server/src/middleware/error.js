export const notFound = (_req, res) => {
  res.status(404).json({ error: 'Route not found' })
}

export const errorHandler = (err, _req, res, _next) => {
  const status = err.statusCode || 500
  const message = err.message || 'Server error'
  res.status(status).json({ error: message })
}
