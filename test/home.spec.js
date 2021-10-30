import request from 'supertest';
import app from '../src/app.js';


describe('/GET Home/*', () => {
  it('it should GET home page', async () => {
    const res = await request(app)
      .get('/home')
    expect(res.statusCode).toEqual(200)
  });
})