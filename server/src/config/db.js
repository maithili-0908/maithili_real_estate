import mongoose from 'mongoose'

const connectDB = async () => {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    throw new Error('MONGODB_URI is not set')
  }

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    })
  } catch (error) {
    if (error?.code === 8000) {
      throw new Error(
        'MongoDB authentication failed (code 8000). Verify Render MONGODB_URI credentials and URL-encode special characters in the password.',
        { cause: error }
      )
    }

    throw error
  }
}

export default connectDB
