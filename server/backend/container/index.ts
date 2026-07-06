import 'reflect-metadata'
import { Container } from 'inversify'
import { CreateReservationUseCase } from '../application/reservation/CreateReservationUseCase'
import type { ReservationRepository } from '../domain/reservation/repositories/ReservationRepository'
import { DrizzleReservationRepository } from '../infrastructure/persistence/DrizzleReservationRepository'
import { ReservationController } from '../presentation/http/controllers/ReservationController'
import { TYPES } from './types'

const container = new Container()

const reservationRepository = new DrizzleReservationRepository()
const createReservationUseCase = new CreateReservationUseCase(reservationRepository)
const reservationController = new ReservationController(createReservationUseCase)

container
  .bind<ReservationRepository>(TYPES.ReservationRepository)
  .toConstantValue(reservationRepository)
container
  .bind<CreateReservationUseCase>(TYPES.CreateReservationUseCase)
  .toConstantValue(createReservationUseCase)
container
  .bind<ReservationController>(TYPES.ReservationController)
  .toConstantValue(reservationController)

export { container }
