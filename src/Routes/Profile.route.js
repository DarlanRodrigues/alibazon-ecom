import { Router } from 'express';
import { requiresLogin } from '../Middlewares/Auth.middleware.js';
import { getCart } from '../Controllers/Cart.controller.js';
import { getProductsById } from '../Controllers/Product.controller.js';

const router = Router();

router.get('/', requiresLogin, async (req, res, next) => {
  const cart = await getCart(req.cookies.logged_user.token);
  
  let productsCart = [];
  if(cart.status !== 400){
    productsCart = await Promise.all(cart.data.items.map( async (obj) => {
      const product = await getProductsById(obj.productId);    
      return ({ ...obj, 
                info: { id: product[0].id, name: product[0].name, description: product[0].short_description},
                img: product[0].image_groups.find(a => a.view_type == "small" && a.variation_value == obj.variant.variation_values.color).images[0],
              })
    }));
  }
  

  res.render('profile', {
    productsCart: productsCart,
    cartHasItems: (cart.status !== 400),
    totalItems: (cart.status !== 400) ? cart.data.items.length : 0,
    totalPrice: (cart.status !== 400) ? cart.data.items.map(item => item.variant.price).reduce((prev, next) => prev + next).toFixed(2) : 0,
    breadcrumb: [
      { item: 'Profile', href: '/profile' }
    ]
  });
});

export default router;