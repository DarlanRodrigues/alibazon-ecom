import request from 'supertest';
import app from '../src/app.js';
import { getAllCategories, getCategoriesByParentId, getCategoryById } from '../src/Controllers/Category.controller';


describe('/GET category/*', () => {
  it('it should GET a specificy category page', async () => {
    const res = await request(app)
      .get('/category/womens/womens-clothing')
    expect(res.statusCode).toEqual(200)
  });

  it('it should GET last category page and redirect to product page', async () => {
    const res = await request(app)
      .get('/category/womens/womens-clothing/womens-clothing-dresses')
    expect(res.statusCode).toEqual(302)
  });
})

describe('Check method getAllCategories', () => {
  it('it should return all categories', async () => {
    const response = await getAllCategories()
    expect(response.length).toBeGreaterThan(0)

  })
})

describe('Check method getCategoriesByParentId', () => {
    it('it should return categories with especificy parent category', async () => {
      const response = await getCategoriesByParentId('root')
      expect(response.length).toBeGreaterThan(0)
    })
});

describe('Check method getCategoriesByParentId', () => {
    it('it should return categories with especificy parent category', async () => {
      const response = await getCategoriesByParentId('root')
      expect(response.length).toBeGreaterThan(0)
    })
});


describe('Check method getCategoryById', () => {
    it('it should return category with especificy id', async () => {
      const response = await getCategoryById('mens')
      expect(response).toHaveProperty("image")
      expect(response).toHaveProperty("id")
    })
});