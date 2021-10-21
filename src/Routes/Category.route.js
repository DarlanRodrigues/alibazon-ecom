import { Router } from 'express';
import { existsSync } from 'fs';
import { getCategoryById, getCategoriesByParentId } from '../Controllers/Category.controller.js';
import { getProductsByCategoryId } from '../Controllers/Product.controller.js';

var router = Router();

router.get('/*', async (req, res, next) => {
  const reqParams = req.params[0].split('/');

  // TODO: Check if parentCategory exist and subcategory belongs to it. 
  const parentCategory  = reqParams.at(-2) || reqParams.at(-1);
  const subCategory     = reqParams.at(-1);
  const lastSubCategory = getProductsByCategoryId(subCategory);
  
  if(!lastSubCategory.hasOwnProperty('error') && subCategory.split('-').length === 3){
    res.redirect(`/product/list/${subCategory}`)  
  }
  res.render('categories', { 
    parentCategory: await getCategoryById(parentCategory),
    categories: await getCategoriesByParentId(subCategory),
    categorypath: req.path,
    existsSync: existsSync
  });
});

export default router;
