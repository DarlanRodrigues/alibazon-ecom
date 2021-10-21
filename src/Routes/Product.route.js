import { Router } from 'express';
import { getAllProducts, getProductsByCategoryId } from '../Controllers/Product.controller.js';
var router = Router();

router.get('/list/:parentCategory', async (req, res, next) => {
    res.render('productsList', {
        title: req.params.parentCategory,
        products: await getProductsByCategoryId()
    });
});

router.get('/:productId(\d+)', async (req, res, next) => {
    res.render('product', {
        products: await getAllProducts()
    });
});
export default router;
