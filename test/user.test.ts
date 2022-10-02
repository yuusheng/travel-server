import request from 'supertest'
import { afterAll, expect, test } from 'vitest'
import { app, server } from '../src/app'

afterAll(() => {
  server.close()
})

test('hello world works', async () => {
  const response = await request(app.callback()).get('/api')
  expect(response.status).toBe(200)
  expect(response.body.msg).toBe('hello koa-ts')
})
