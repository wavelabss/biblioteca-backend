import { Request, Response } from 'express'
import { Book, IBook } from '@src/models/book'

export class BooksController {
  public async index(_: Request, response: Response): Promise<Response> {
    try {
      const books = await Book.find()
      return response.status(200).json(books)
    } catch (error) {
      return response.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    }
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const body: Omit<IBook, '_id'> = request.body
      const book = await Book.create(body)
      return response.status(201).json(book)
    } catch (error) {
      return response.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id
      const body: Partial<Omit<IBook, '_id'>> = request.body

      const book = await Book.findByIdAndUpdate(id, body, { new: true })

      return response.status(200).json(book)
    } catch (error) {
      return response.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    }
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    try {
      const id = request.params.id
      await Book.deleteOne({ _id: id })

      return response.status(204).json()
    } catch (error) {
      return response.status(500).json({
        code: 500,
        message: 'Something went wrong'
      })
    }
  }
}
