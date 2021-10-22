import { Router } from 'express';
import { getCategoryById } from '../Controllers/Category.controller.js';
import { getAllProducts, getProductsByCategoryId } from '../Controllers/Product.controller.js';

var router = Router();

router.get('/list/:parentCategory', async (req, res, next) => {
    const category = await getCategoryById(req.params.parentCategory);
    const products = await getProductsByCategoryId(req.params.parentCategory);

    res.render('productsList', {
        title: req.params.parentCategory,
        products: products
    });
});

router.get('/:productId(\d+)', async (req, res, next) => {
    res.render('product', {
        products: await getAllProducts()
    });
});
export default router;
