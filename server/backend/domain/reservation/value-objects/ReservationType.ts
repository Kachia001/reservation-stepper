const allowedTypes = ['consulting', 'tour', 'service'] as const

export type ReservationTypeValue = (typeof allowedTypes)[number]

export class ReservationType {
  private constructor(readonly value: ReservationTypeValue) {}

  static create(value: string) {
    if (!allowedTypes.includes(value as ReservationTypeValue)) {
      throw new Error('지원하지 않는 예약 유형입니다.')
    }

    return new ReservationType(value as ReservationTypeValue)
  }
}
