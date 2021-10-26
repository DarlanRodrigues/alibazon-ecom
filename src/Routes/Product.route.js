import { Router } from 'express';
import { getCategoryById } from '../Controllers/Category.controller.js';
import { getAllProducts, getProductsById, getProductsByCategoryId } from '../Controllers/Product.controller.js';

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
    const products = await getProductsById(req.params.productId);

    res.render('product', {
        pageTitle: products[0].page_title,
        productName: products[0].name,
        productDescription: products[0].page_description,
        productCurrency: products[0].currency,
        productPrice: products[0].price,
        variantionSize: products[0].variation_attributes.find( el => el.id === 'size').values,
        variantionColor: products[0].variation_attributes.find( el => el.id === 'color').values
    });
});

export default router;
