import { Router } from 'express';
import { getAllProducts } from '../Controllers/Product.controller.js';
var router = Router();

router.get('/', async (req, res, next) => {
    res.render('productsList', {
        products: await getAllProducts()
    });
});

export default router;