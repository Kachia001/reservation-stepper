import { ReservationType } from '../value-objects/ReservationType'

export type ReservationProps = {
  id: string
  type: ReservationType
  visitorName: string
  reservedAt: Date
  createdAt: Date
}

export class Reservation {
  private constructor(private readonly props: ReservationProps) {}

  static create(props: Omit<ReservationProps, 'id' | 'createdAt'>) {
    return new Reservation({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date()
    })
  }

  toJSON() {
    return {
      id: this.props.id,
      type: this.props.type.value,
      visitorName: this.props.visitorName,
      reservedAt: this.props.reservedAt.toISOString(),
      createdAt: this.props.createdAt.toISOString()
    }
  }
}
