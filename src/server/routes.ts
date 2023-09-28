import { Router, Request, Response, Express } from 'express'
import authRouter from '@/modules/auth/auth.routes'
import tokenRouter from '@/modules/tokens/tokens.routes'
import userRouter from '@/modules/users/users.routes'
import postRouter from '@/modules/posts/posts.routes'
import mediaRouter from '@/modules/media/media.routes'
// import orderRouter from '../modules/orders/orders.routes'
// import shopifyRouter from '../modules/shopify/shopify.routes'

const routes = Router()

routes.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});
routes.use(authRouter)
routes.use(tokenRouter)
routes.use(userRouter)
routes.use(postRouter)
routes.use(mediaRouter)

export default routes