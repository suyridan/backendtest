import { AppDataSource } from "../src/config/AppDataSource";

const request = require('supertest')
const index = require('../src/index'); // Importar clase servidor

describe('Pagos', () => {

  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
    index.close()
  })
  let jwtToken = '';
  describe('init session', () => {
    it('Debe iniciar sesión', async () => {
      const res = await request(index)
        .post('/auth/login')
        .send({ username: 'albertohs', password: '123456' })
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
      jwtToken = res.body.token
    })
  })


  it('Consulta los pagos', async () => {
    const res = await request(index)
      .post('/api/getPagos')
      .set('Authorization', 'Bearer ' + jwtToken)
      .send({ fecha_actual: "2021-02-20", tasa_interes: 7.50, dias_anio_comercial: 360 })
    expect(res.statusCode).toEqual(200)
  })
})