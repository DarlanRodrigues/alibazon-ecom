import { Router } from 'express';
import { requiresLogin } from '../Middlewares/Auth.middleware.js';
import { addItemCart, removeItemCart } from '../Controllers/Cart.controller.js';
const router = Router();

router.post('/addItem', requiresLogin, async (req, res, next) => {
    const response = await addItemCart(req.cookies.logged_user.token, req.body.product_id, req.body.product_variant_id, req.body.product_quantity);

    res.json(response.data);
});

router.post('/removeItem', requiresLogin, async (req, res, next) => {
    const response = await removeItemCart(req.cookies.logged_user.token, req.body.product_id, req.body.product_variant_id);

    res.redirect('/profile');
});
export default router;
