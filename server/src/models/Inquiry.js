import mongoose from 'mongoose'

const { Schema } = mongoose

const inquirySchema = new Schema(
  {
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'responded', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true },
)

inquirySchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Inquiry = mongoose.model('Inquiry', inquirySchema)

export default Inquiry
