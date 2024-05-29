import AppDataSource from "../src/config/data.source";

const request = require('supertest')
const index = require('../src/index'); // Importar clase servidor
describe('Pagos', () => {

  beforeAll(async() => {
    AppDataSource.initialize()
  })

  afterAll(async()=> {
    AppDataSource.destroy()
  })


  it('Consulta los pagos', async () => {
    const res = await request(index)
      .get('/api/getPagos')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('get')
  })
})

describe('inicio de sesion', () => {

    beforeAll(async() => {
      AppDataSource.initialize()
    })

    afterAll(async()=> {
      AppDataSource.destroy()
    })

    it('Debe iniciar sesión', async () => {
      const res = await request(index)
        .post('/auth/login')
        .send({username: 'albertohs',password: '123456'})
      expect(res.statusCode).toEqual(200)
      expect(res.body).toHaveProperty('token')
    })
  })

describe('Get menu', () => {
  beforeAll(async() => {
    AppDataSource.initialize()
  })

  afterAll(async()=> {
    AppDataSource.destroy()
  })
    it("Creates a new user", done => {
        request(index)
          .get("/api/getMenu")
          .expect((response: any) => {console.log(response)})
          .expect(200, done);
      });
  })