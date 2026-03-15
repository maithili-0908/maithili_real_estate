import mongoose from 'mongoose'

const { Schema } = mongoose

const messageSchema = new Schema(
  {
    agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
    name: { type: String },
    email: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
)

messageSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Message = mongoose.model('Message', messageSchema)

export default Message
