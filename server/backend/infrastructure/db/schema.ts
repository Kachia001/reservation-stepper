import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const reservations = pgTable('reservations', {
  id: uuid('id').primaryKey(),
  type: text('type').notNull(),
  visitorName: text('visitor_name').notNull(),
  reservedAt: timestamp('reserved_at', { withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull()
})

export type ReservationRow = typeof reservations.$inferSelect
export type NewReservationRow = typeof reservations.$inferInsert
