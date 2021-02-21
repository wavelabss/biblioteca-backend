import mongoose, { Document, Model } from 'mongoose'

export interface IBook {
  _id?: string
  publishing: string
  title: string
  photo: string
  authors: string[]
}

interface BookModel extends Omit<IBook, '_id'>, Document {}

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

export const Book: Model<BookModel> = mongoose.model('Book', schema)
