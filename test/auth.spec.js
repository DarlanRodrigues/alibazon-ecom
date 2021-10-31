import request from 'supertest';
import app from '../src/app.js';
import { signIn } from '../src/Controllers/Auth.controller.js';
import User from '../src/Models/User.js';

const mockUser = new User('Teste', 'teste@gmail.com','12345');

describe('/POST Auth/Signin', () => {
  it('it should login', async () => {
    const res = await request(app)
      .post('/auth/signin')
      .send({ email: mockUser.email, password: mockUser.password })
    expect(res.statusCode).toEqual(302)
  })
})

describe('/GET Auth/logout', () => {
  it('it should logout', async () => {
    const res = await request(app)
      .get('/auth/logout')
    expect(res.statusCode).toEqual(302)
  })
})

describe('Check method sign in', () => {
  it('it should return logged user info', async () => {
    const response = await signIn(mockUser);
    expect(response.data).toHaveProperty("token")
    expect(response.data).toHaveProperty("user")
  })
})