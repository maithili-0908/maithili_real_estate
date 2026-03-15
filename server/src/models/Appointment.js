import mongoose from 'mongoose'

const { Schema } = mongoose

const appointmentSchema = new Schema(
  {
    property: { type: Schema.Types.ObjectId, ref: 'Property' },
    agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    tourType: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ['requested', 'confirmed', 'completed'],
      default: 'requested',
    },
  },
  { timestamps: true },
)

appointmentSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment
