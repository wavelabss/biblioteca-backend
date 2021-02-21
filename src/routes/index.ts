import { Router } from 'express'

import { BooksController } from '@src/controllers/books'

const router = Router()

const booksController = new BooksController()

router.get('/books', booksController.index)
router.post('/books', booksController.store)
router.put('/books/:id', booksController.update)
router.delete('/books/:id', booksController.destroy)

export default router
