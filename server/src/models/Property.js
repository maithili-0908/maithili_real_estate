import mongoose from 'mongoose'

const { Schema } = mongoose

const propertySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    sqft: { type: Number, default: 0 },
    status: { type: String, default: 'Available' },
    images: [{ type: String }],
    tags: [{ type: String }],
    lat: { type: Number },
    lng: { type: Number },
    agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
    description: { type: String },
  },
  { timestamps: true },
)

propertySchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    if (ret.agent) {
      if (typeof ret.agent === 'object' && ret.agent.id) {
        ret.agentId = ret.agent.id
      } else if (typeof ret.agent === 'object' && ret.agent._id) {
        ret.agentId = ret.agent._id.toString()
      } else {
        ret.agentId = ret.agent.toString()
      }
    }
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Property = mongoose.model('Property', propertySchema)

export default Property
