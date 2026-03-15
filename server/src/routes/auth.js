import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Agent from '../models/Agent.js'
import asyncHandler from '../utils/asyncHandler.js'

const router = express.Router()

const signToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      role: user.role,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { name, email, password, role = 'user', phone } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ error: 'Email already in use' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      passwordHash,
      role,
      phone,
    })

    if (role === 'agent') {
      await Agent.create({
        name,
        email,
        phone,
        role: 'Maithili Estates Agent',
        transactions: 0,
        rating: 4.9,
        bio: 'New agent profile created via registration for Chennai.',
        user: user.id,
      })
    }

    const token = signToken(user.toJSON())
    return res.status(201).json({ data: { user: user.toJSON(), token } })
  }),
)

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing credentials' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = signToken(user.toJSON())
    return res.json({ data: { user: user.toJSON(), token } })
  }),
)

export default router
