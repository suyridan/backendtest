import { AppDataSource } from "../src/config/AppDataSource";

const request = require('supertest')
const index = require('../src/index'); // Importar clase servidor

describe('inicio de sesion', () => {

  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
    index.close()
  })

  it('Debe iniciar sesión', async () => {
    const res = await request(index)
      .post('/auth/login')
      .send({ username: 'albertohs', password: '123456' })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })
})