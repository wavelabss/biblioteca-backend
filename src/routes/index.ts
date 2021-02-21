import { Router } from 'express'

const router = Router()

router.get('/books', (request, response) => {
  return response.json({ hello: 'Hello' })
})

export default router
