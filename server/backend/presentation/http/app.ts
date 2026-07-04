import express from 'express'
import { createReservationRouter } from './routes/reservation.routes'

export function createExpressApp() {
  const app = express()

  app.use(express.json())

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok' })
  })

  app.use('/reservations', createReservationRouter())

  return app
}
