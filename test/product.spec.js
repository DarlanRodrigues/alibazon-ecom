import request from 'supertest';
import app from '../src/app.js';
import { getAllProducts, getProductsById, getProductsByCategoryId, structureProductVariants} from '../src/Controllers/Product.controller.js'

describe('/GET list/search', () => {
  it('it should GET a search list of products', async () => {
    const res = await request(app)
      .get('/product/list/search')
      .query({ searchText: 'be'})
    expect(res.statusCode).toEqual(200)
  });

})

describe('/GET list/:parentCategory', () => {
  it('it should GET a list of products from specificy category', async () => {
    const res = await request(app)
      .get('/product/list/womens-clothing-tops')
    expect(res.statusCode).toEqual(200)
  })
})

describe('/GET /:productId', () => {
    it('it should GET a page from specific product', async () => {
      const res = await request(app)
        .get('/product/25592211')
      expect(res.statusCode).toEqual(200)
    })
})

describe('Check method getAllProducts', () => {
    it('it should return all products', async () => {
      const response = await getAllProducts();
      expect(response.length).toBeGreaterThan(0)
      expect(response[0]).toHaveProperty("master")
    })
})

describe('Check method getProductsById', () => {
    it('it should return product with specificy id', async () => {
      const response = await getProductsById('25592211');
      expect(response.length).toBeGreaterThan(0)
      expect(response[0]).toHaveProperty("master")
    })
})

describe('Check method getProductsByCategoryId', () => {
    it('it should return all products with specificy category id', async () => {
      const response = await getProductsByCategoryId('womens-clothing-dresses');
      expect(response.length).toBeGreaterThan(0)
      expect(response[0]).toHaveProperty("master")
    })
})

describe('Check method structureProductVariants', () => {
    it('it should return a structured product based on variants', async () => {
      const product = await getProductsById('25592211');
      const response = await structureProductVariants(product[0]);

      expect(product.length).toBeGreaterThan(0)
      expect(response).toHaveProperty("id")
      expect(response).toHaveProperty("page_title")
      expect(response).toHaveProperty("name")
      expect(response).toHaveProperty("description")
      expect(response).toHaveProperty("currency")
      expect(response).toHaveProperty("price")
      expect(response).toHaveProperty("sizes")
      expect(response).toHaveProperty("colors")
      expect(response).toHaveProperty("colors")
      expect(response).toHaveProperty("variantsImg")
    });
})