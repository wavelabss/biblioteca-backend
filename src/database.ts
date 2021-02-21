import mongoose, { Mongoose } from 'mongoose'
import logger from './logger'

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(`${process.env.MONGODB_URL}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) return logger.error(err)

    return logger.info('Connected on database with success')
  })

export const close = (): Promise<void> => mongoose.connection.close()
