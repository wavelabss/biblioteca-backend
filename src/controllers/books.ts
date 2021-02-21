import { Request, Response } from 'express'

export class BooksController {
  public async index(request: Request, response: Response): Promise<Response> {
    return response.json({ hello: 'Hello' })
  }
}
