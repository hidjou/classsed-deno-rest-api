import { Router, RouterContext } from 'https://deno.land/x/oak/mod.ts'
import { v4 as uuid } from 'https://deno.land/std@0.74.0/uuid/mod.ts'

import Post from '../models/Post.ts'

const router = new Router()

// Read
router.get('/', async ({ response }: RouterContext) => {
  try {
    const posts = await Post.all()

    response.body = posts
  } catch (err) {
    console.log(err)
    response.body = { error: 'Something went wrong' }
    response.status = 500
  }
})

// Create
router.post('/', async ({ request, response }: RouterContext) => {
  try {
    const { username, body } = await request.body().value

    const post = await Post.create({ username, body, uuid: uuid.generate() })

    response.body = post
  } catch (err) {
    console.log(err)
    response.body = { error: 'Something went wrong' }
    response.status = 500
  }
})

// Update
router.put('/:uuid', async ({ params, request, response }: RouterContext) => {
  const { username, body } = await request.body().value
  try {
    const post = await Post.where('uuid', params.uuid).first()

    if (!post) {
      response.body = { post: 'Post not found' }
      response.status = 404
      return
    }

    post.username = username
    post.body = body

    await post.update()

    response.body = post
  } catch (err) {
    console.log(err)
    response.body = { error: 'Something went wrong' }
    response.status = 500
  }
})

// Delete
router.delete('/:uuid', async ({ params, response }: RouterContext) => {
  try {
    const post = await Post.where('uuid', params.uuid).first()

    if (!post) {
      response.body = { post: 'Post not found' }
      response.status = 404
      return
    }

    await post.delete()

    response.body = { message: 'Post deleted successfully' }
  } catch (err) {
    console.log(err)
    response.body = { error: 'Something went wrong' }
    response.status = 500
  }
})

// Find
router.get('/:uuid', async ({ params, response }: RouterContext) => {
  try {
    const post = await Post.where('uuid', params.uuid).first()

    if (!post) {
      response.body = { post: 'Post not found' }
      response.status = 404
      return
    }

    response.body = post
  } catch (err) {
    console.log(err)
    response.body = { error: 'Something went wrong' }
    response.status = 500
  }
})

export default router
