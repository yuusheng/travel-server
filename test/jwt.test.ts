import { describe, expect, it } from 'vitest'
import { generateToken } from '../src/utils'

describe('generateToken', () => {
  it('should work', () => {
    expect(
      generateToken({ username: 'j', password: '123456' }))
      .toMatchInlineSnapshot('"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImoiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTY2NDcwNzQyMywiZXhwIjoxNjY1MzEyMjIzfQ.WNJ2A7vNwGyZFAdgwLq4KTBatcd5UPE6gWycgBuHOPI"')
  })
})
