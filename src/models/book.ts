import mongoose, { Document, Model } from 'mongoose'

export interface Book {
  _id?: string
  title: string
  photo: string
  authors: string[]
}

interface UserModel extends Omit<Book, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    publishing: { type: String, required: true },
    photo: { type: String, required: true },
    authors: [
      { type: String }
    ]
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
      }
    }
  }
)

export const User: Model<UserModel> = mongoose.model('User', schema)
