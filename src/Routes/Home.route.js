import { Router } from 'express';
import { getCategoriesByParentId } from '../Controllers/Category.controller.js';

var router = Router();

router.get(['/', '/home'], async (req, res, next) => {
  res.render('home', { 
    title: 'Alibazon',
    categories: await getCategoriesByParentId('root')
  });
});

export default router;
