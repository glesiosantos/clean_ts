import request from 'supertest'
import app from '../config/app'

describe('Sign Up Route', () => {
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'Glêsio Santos', email: 'glesio.s.silva', password: '123456' })
      .expect(200)
  })
})
