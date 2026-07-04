import { Reservation } from '../../domain/reservation/entities/Reservation'
import type { ReservationRepository } from '../../domain/reservation/repositories/ReservationRepository'
import { ReservationType } from '../../domain/reservation/value-objects/ReservationType'
import type { CreateReservationCommand } from './dto'

export class CreateReservationUseCase {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async execute(command: CreateReservationCommand) {
    const reservedAt = new Date(command.reservedAt)

    if (Number.isNaN(reservedAt.getTime())) {
      throw new Error('예약 일시가 올바르지 않습니다.')
    }

    if (!command.visitorName.trim()) {
      throw new Error('방문자 이름이 필요합니다.')
    }

    const reservation = Reservation.create({
      type: ReservationType.create(command.type),
      visitorName: command.visitorName.trim(),
      reservedAt
    })

    await this.reservationRepository.save(reservation)

    return reservation.toJSON()
  }
}
