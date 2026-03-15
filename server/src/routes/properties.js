import express from 'express'
import Property from '../models/Property.js'
import Agent from '../models/Agent.js'
import asyncHandler from '../utils/asyncHandler.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

const getAgentForUser = async (userId) => Agent.findOne({ user: userId })

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const {
      search,
      location,
      type,
      beds,
      priceMin,
      priceMax,
      sort = 'recommended',
    } = req.query

    const filter = {}
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { location: new RegExp(search, 'i') },
      ]
    }
    if (location) {
      filter.location = location
    }
    if (type) {
      filter.type = type
    }
    if (beds) {
      if (beds === '4+') {
        filter.beds = { $gte: 4 }
      } else {
        filter.beds = Number(beds)
      }
    }
    if (priceMin || priceMax) {
      filter.price = {
        ...(priceMin ? { $gte: Number(priceMin) } : {}),
        ...(priceMax ? { $lte: Number(priceMax) } : {}),
      }
    }

    const sortMap = {
      'price-asc': { price: 1 },
      'price-desc': { price: -1 },
      'size-desc': { sqft: -1 },
    }

    const properties = await Property.find(filter).sort(
      sortMap[sort] || { createdAt: -1 },
    )

    return res.json({ data: properties })
  }),
)

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    return res.json({ data: property })
  }),
)

router.post(
  '/',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (req, res) => {
    const payload = req.body
    if (req.user.role === 'agent') {
      const agent = await getAgentForUser(req.user.id)
      if (!agent) {
        return res.status(403).json({ error: 'Agent profile not found' })
      }
      payload.agent = agent.id
    } else if (payload.agentId && !payload.agent) {
      const agent = await Agent.findById(payload.agentId)
      if (agent) payload.agent = agent.id
    }
    const property = await Property.create(payload)
    return res.status(201).json({ data: property })
  }),
)

router.put(
  '/:id',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    if (req.user.role === 'agent') {
      const agent = await getAgentForUser(req.user.id)
      if (!agent || String(property.agent) !== String(agent.id)) {
        return res.status(403).json({ error: 'Forbidden' })
      }
      req.body.agent = agent.id
    }
    Object.assign(property, req.body)
    await property.save()
    return res.json({ data: property })
  }),
)

router.delete(
  '/:id',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    if (req.user.role === 'agent') {
      const agent = await getAgentForUser(req.user.id)
      if (!agent || String(property.agent) !== String(agent.id)) {
        return res.status(403).json({ error: 'Forbidden' })
      }
    }
    await Property.deleteOne({ _id: property.id })
    return res.json({ data: { id: property.id } })
  }),
)

export default router
