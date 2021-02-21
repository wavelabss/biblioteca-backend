import { Request, Response } from 'express'
import { Book } from '@src/models/book'

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
    return response.json()
  }
}
