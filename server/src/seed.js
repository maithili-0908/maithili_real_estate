import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import connectDB from './config/db.js'
import User from './models/User.js'
import Agent from './models/Agent.js'
import Property from './models/Property.js'
import Inquiry from './models/Inquiry.js'
import Appointment from './models/Appointment.js'
import Message from './models/Message.js'
import { agentSeeds, propertySeeds } from './data/seedData.js'

dotenv.config()

const seed = async () => {
  await connectDB()

  await Promise.all([
    User.deleteMany({}),
    Agent.deleteMany({}),
    Property.deleteMany({}),
    Inquiry.deleteMany({}),
    Appointment.deleteMany({}),
    Message.deleteMany({}),
  ])

  const adminPassword = await bcrypt.hash('admin123', 10)
  await User.create({
    name: 'Admin User',
    email: 'admin@maithiliestates.in',
    passwordHash: adminPassword,
    role: 'admin',
  })

  const agentDocs = []
  for (const seedAgent of agentSeeds) {
    const passwordHash = await bcrypt.hash('agent123', 10)
    const user = await User.create({
      name: seedAgent.name,
      email: seedAgent.email,
      passwordHash,
      role: 'agent',
      phone: seedAgent.phone,
    })

    const { key: _key, ...agentPayload } = seedAgent
    const agent = await Agent.create({
      ...agentPayload,
      user: user.id,
    })
    agentDocs.push(agent)
  }

  const agentMap = agentSeeds.reduce((acc, seedAgent, index) => {
    acc[seedAgent.key] = agentDocs[index]?.id
    return acc
  }, {})

  const propertyDocs = propertySeeds.map((property) => ({
    ...property,
    agent: agentMap[property.agentKey],
  }))

  await Property.insertMany(propertyDocs)

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
