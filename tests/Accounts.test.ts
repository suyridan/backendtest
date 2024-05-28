const request = require('supertest')
jest.useFakeTimers()
const index = require('../src/index'); // Importar clase servidor
describe('Pagos', () => {
  it('Consulta los pagos', async () => {
    const res = await request(index)
      .get('/api/get_pagos')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('get')
  })
})

afterEach(() => index.close());
describe('inicio de sesion', () => {
    it('Debe iniciar sesión', async () => {
      const res = await request(index)
        .post('/auth/login')
        .send({username: 'albertohs',password: '123456'})
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })
  })

afterEach(() => index.close());
describe('Get menu', () => {
    it("Creates a new user", done => {
        request(index)
          .get("/api/getMenu")
          .expect((response: any) => {console.log(response)})
          .expect(200, done);
      });
  })