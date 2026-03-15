import mongoose from 'mongoose'

const { Schema } = mongoose

const agentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: 'Real Estate Agent' },
    phone: { type: String },
    email: { type: String, required: true },
    rating: { type: Number, default: 4.8 },
    transactions: { type: Number, default: 0 },
    bio: { type: String },
    avatar: { type: String },
    specialties: [{ type: String }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
)

agentSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Agent = mongoose.model('Agent', agentSchema)

export default Agent
