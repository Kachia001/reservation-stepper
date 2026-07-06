import { desc } from 'drizzle-orm'
import { Reservation } from '../../domain/reservation/entities/Reservation'
import type { ReservationRepository } from '../../domain/reservation/repositories/ReservationRepository'
import { ReservationType } from '../../domain/reservation/value-objects/ReservationType'
import { db } from '../db/client'
import { reservations, type ReservationRow } from '../db/schema'

function toDomain(row: ReservationRow) {
  return Reservation.fromPersistence({
    id: row.id,
    type: ReservationType.create(row.type),
    visitorName: row.visitorName,
    reservedAt: row.reservedAt,
    createdAt: row.createdAt
  })
}

export class DrizzleReservationRepository implements ReservationRepository {
  async save(reservation: Reservation) {
    const snapshot = reservation.toJSON()

    await db.insert(reservations).values({
      id: snapshot.id,
      type: snapshot.type,
      visitorName: snapshot.visitorName,
      reservedAt: new Date(snapshot.reservedAt),
      createdAt: new Date(snapshot.createdAt)
    })
  }

  async findAll() {
    const rows = await db
      .select()
      .from(reservations)
      .orderBy(desc(reservations.createdAt))

    return rows.map(toDomain)
  }
}
