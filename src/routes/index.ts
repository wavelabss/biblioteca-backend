import { Router } from 'express'

import { BooksController } from '@src/controllers/books'

const router = Router()

const booksController = new BooksController()

router.get('/books', booksController.index)
router.post('/books', booksController.store)

export default router
