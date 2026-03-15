import express from 'express'
import Appointment from '../models/Appointment.js'
import Property from '../models/Property.js'
import asyncHandler from '../utils/asyncHandler.js'
import { requireAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { propertyId, name, email, tourType, date, time, notes, phone } =
      req.body
    if (!propertyId || !name || !email || !tourType || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const property = await Property.findById(propertyId)
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    const appointment = await Appointment.create({
      property: property.id,
      agent: property.agent,
      name,
      email,
      phone,
      tourType,
      date,
      time,
      notes,
    })
    return res.status(201).json({ data: appointment })
  }),
)

router.get(
  '/',
  requireAuth,
  requireRole('agent', 'admin'),
  asyncHandler(async (_req, res) => {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .lean()
    return res.json({ data: appointments })
  }),
)

export default router
