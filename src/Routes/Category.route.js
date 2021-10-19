import { Router } from 'express';
import { existsSync } from 'fs';
import { getCategoryById, getCategoriesByParentId } from '../Controllers/Category.controller.js';

var router = Router();

router.get(['/:parentCategory'], async (req, res, next) => {
  res.render('subcategories', { 
    parentCategory: await getCategoryById(req.params.parentCategory),
    categories: await getCategoriesByParentId(req.params.parentCategory),
    existsSync: existsSync
  });
});

export default router;
