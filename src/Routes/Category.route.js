import { Router } from 'express';
import { existsSync } from 'fs';
import { getCategoryById, getCategoriesByParentId } from '../Controllers/Category.controller.js';
import { getProductsByCategoryId } from '../Controllers/Product.controller.js';

var router = Router();

router.get('/*', async (req, res, next) => {
  const reqParams = req.params[0].split('/');
  const breadcrumb = 
    reqParams.map((item, index) => {
      return {
        item: item.replace(/-/g, ' '),
        href: '/category/'+ reqParams.slice(0, index +1 ).join('/')
      }
    });

  // TODO: Check if parentCategory exist and subcategory belongs to it. 
  
  const parentCategory  = reqParams[reqParams.length - 2] || reqParams[reqParams.length - 1];
  const subCategory     = reqParams[reqParams.length - 1];
  const lastSubCategory = await getProductsByCategoryId(subCategory);
  
  if(lastSubCategory.status !== 400){
    res.redirect(`/product/list/${subCategory}`);
  }
  res.render('categories', { 
    parentCategory: await getCategoryById(parentCategory),
    categories: await getCategoriesByParentId(subCategory),
    categorypath: req.path,
    breadcrumb: breadcrumb,
    existsSync: existsSync,
    
  });
});

export default router;
