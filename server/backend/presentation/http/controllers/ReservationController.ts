import type { Request, Response } from 'express'
import { CreateReservationUseCase } from '../../../application/reservation/CreateReservationUseCase'

export class ReservationController {
  constructor(private readonly createReservationUseCase: CreateReservationUseCase) {}

  create = async (request: Request, response: Response) => {
    try {
      const reservation = await this.createReservationUseCase.execute(request.body)

      response.status(201).json({
        data: reservation
      })
    } catch (error) {
      response.status(400).json({
        message: error instanceof Error ? error.message : '예약 생성에 실패했습니다.'
      })
    }
  }
}
