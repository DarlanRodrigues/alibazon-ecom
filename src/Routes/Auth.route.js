import { Router } from 'express';
import { signUp } from '../Controllers/Auth.controller.js';
import { check, validationResult } from 'express-validator';
import { User } from '../Models/User.js';
const router = Router();

router.get('/signup', async (req, res, next) => {
  res.render('signup', { });
});

router.post('/signup', [
  check('completeName', 'The complete name must be between 3 to 45 characters long')
    .exists()
    .isLength({ min: 3, max: 45 }),
  check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password must be minimum 5 characters')
    .isLength({ min: 5 }),
  check('passwordConfirm', 'Password confirmation does not match password')
    .isLength({ min: 5 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    })
], (req, res, next)=> {

  const errors = validationResult(req)
  if(!errors.isEmpty()) {
      let errorsMessages = errors.array();
      //Remove duplicates messages
      errorsMessages = [...new Set(errorsMessages)];
      res.render('signup', {
        errorsMessages: errorsMessages
      })
  }else{
    signUp(new User(req.body.completeName, req.body.email, req.body.password));
  }
})
export default router;