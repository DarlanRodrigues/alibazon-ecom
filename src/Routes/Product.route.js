import { Router } from 'express';
import { getAllProducts, getProductsById, getProductsByCategoryId, structureProductVariants } from '../Controllers/Product.controller.js';

const router = Router();

router.get('/list/search/', async (req, res, next) => {
    const allProducts = await getAllProducts();
    const products    = allProducts.filter(elem => elem.name.toUpperCase().includes(req.query.searchText.toUpperCase()));

    res.render('productsList', {
        title: `Search products`,
        products: products
    });
});

router.get('/list/:parentCategory', async (req, res, next) => {
    const products = await getProductsByCategoryId(req.params.parentCategory);

    res.render('productsList', {
        title: req.params.parentCategory,
        products: products
    });
});

router.get('/:productId', async (req, res, next) => {
    const products              = await getProductsById(req.params.productId);
    const productVariantInfo    = structureProductVariants(products[0]);
    
    res.render('product', {
        product: productVariantInfo
    });
});

export default router;
