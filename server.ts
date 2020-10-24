import {
  Application,
  Router,
  RouterContext,
} from 'https://deno.land/x/oak/mod.ts'

import postsRouter from './routes/posts.ts'
import db from './db.ts'

const app = new Application()
const router = new Router()
const port = 5000

router.get('/api', (context: RouterContext) => {
  context.response.body = { message: 'Hello World' }
})

app.use(router.routes())
app.use(postsRouter.prefix('/api/posts').routes())
app.use(router.allowedMethods())

await db.sync()

console.log('Database Connected!!')

console.log(`Server up on http://localhost:${port}`)

await app.listen({ port })
