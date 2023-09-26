import { Router, Request, Response, Express } from 'express'
import authRouter from '@/modules/auth/auth.routes'
import tokenRouter from '@/modules/tokens/tokens.route'
// import orderRouter from '../modules/orders/orders.routes'
// import shopifyRouter from '../modules/shopify/shopify.routes'

const routes = Router()

routes.get('/health', (req: Request, res: Response) => {
  console.log('Req', req)
  res.json({ status: 'ok' });
});
routes.use(authRouter)
routes.use(tokenRouter)

export default routes