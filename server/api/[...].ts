import { fromNodeMiddleware } from 'h3'
import { createExpressApp } from '../backend/presentation/http/app'

export default fromNodeMiddleware(createExpressApp())
