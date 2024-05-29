import { AppDataSource } from "../src/config/AppDataSource";

const request = require('supertest')
const index = require('../src/index'); // se importa servidor http 

describe('Get menu', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
  })

  afterAll(async () => {
    await AppDataSource.destroy()
    index.close()
  })
  it("Creates a new user", done => {
    request(index)
      .get("/api/getMenu")
      .expect((response: any) => { console.log(response) })
      .expect(200, done);
  });
})