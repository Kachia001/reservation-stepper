import { Router } from 'express'
import { container } from '../../../container'
import { TYPES } from '../../../container/types'
import { ReservationController } from '../controllers/ReservationController'

export function createReservationRouter() {
  const router = Router()
  const controller = container.get<ReservationController>(TYPES.ReservationController)

  router.post('/', controller.create)

  return router
}
