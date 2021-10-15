import { Router } from 'express';
import { check, validationResult } from 'express-validator';
const router = Router();

router.get('/signin', async (req, res, next) => {
  res.render('signin', { });
});

router.post('/signin', [
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
      errorsMessages = error => [...new Set(error)];
      res.render('signin', {
        errorsMessages: errorsMessages
      })
  }
})
export default router;