import type { Reservation } from '../../domain/reservation/entities/Reservation'
import type { ReservationRepository } from '../../domain/reservation/repositories/ReservationRepository'

export class InMemoryReservationRepository implements ReservationRepository {
  private readonly reservations: Reservation[] = []

  async save(reservation: Reservation) {
    this.reservations.push(reservation)
  }

  async findAll() {
    return [...this.reservations]
  }
}
