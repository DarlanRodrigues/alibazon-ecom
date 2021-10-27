import { Router } from 'express';
import { signUp } from '../Controllers/Auth.controller.js';
import { body, check, validationResult } from 'express-validator';
import { User } from '../Models/User.js';
const router = Router();

router.get('/signup', async (req, res, next) => {
  res.render('signup', { });
});

router.post('/signup', [
    body('completeName', 'The complete name must be between 3 to 45 characters long')
      .exists()
      .isLength({ min: 3, max: 45 }),
    body('email', 'Email is not valid')
      .isEmail()
      .normalizeEmail(),
    body('password', 'Password must be minimum 5 characters')
      .isLength({ min: 5 }),
    body('passwordConfirm')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      })
  ]
, (req, res, next)=> {
    let { errors } = validationResult(req)
  
    if(errors.length !== 0) {
        let errorsMessages = errors.map(a => a.msg);
        //Remove duplicates messages
        errorsMessages = [...new Set(errorsMessages)];
        res.render('signup', {
          errorsMessages: errorsMessages
        })
    }else{
      signUp(new User(req.body.completeName, req.body.email, req.body.password));
      res.redirect('/');
    }
})
export default router;