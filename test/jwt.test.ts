import { generateToken } from '../src/utils'

describe('generateToken', () => {
  it('should work', () => {
    expect(
generateToken({ username: 'j', password: '123456' })).
toMatchInlineSnapshot(`"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiaiIsInBhc3N3b3JkIjoiMTIzNDU2In0sImV4cCI6MTY1ODQ4MDQ3OCwiaWF0IjoxNjU3ODc1Njc4fQ.EIL79ic4RHw4CPzieZAzRhUsJjHAtNlhmR4XwOFVULo"`)
  })
})
