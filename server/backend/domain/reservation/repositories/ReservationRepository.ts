import type { Reservation } from '../entities/Reservation'

export interface ReservationRepository {
  save(reservation: Reservation): Promise<void>
  findAll(): Promise<Reservation[]>
}
