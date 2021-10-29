import { Router } from 'express';
import { signIn, signUp } from '../Controllers/Auth.controller.js';
import { body, validationResult } from 'express-validator';
import { User } from '../Models/User.js';

const router = Router();

router.get('/signup', async (req, res, next) => {
  res.render('signup', { 
    breadcrumb: [
      { item: 'Sign Up', href: '/auth/signup' }
    ]
  });
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
, async (req, res, next)=> {
    let { errors } = validationResult(req)
  
    if(errors.length !== 0) {
      let errorsMessages = errors.map(a => a.msg);
      //Remove duplicates messages
      errorsMessages = [...new Set(errorsMessages)];
      res.render('signup', {
        errorsMessages: errorsMessages,
        breadcrumb: [
          { item: 'Sign Up', href: '/auth/signup' }
        ]
      })
    }
    const { status, data } = await signUp(new User(req.body.completeName, req.body.email, req.body.password ));

    if(status === 200){
      res.cookie("logged_user", data, {
        httpOnly: true,
        maxAge: 1800000,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax'
      }).status(200).redirect('/');
    }else{
      res.render('signup', {
        errorsMessages: [data.error],
        breadcrumb: [
          { item: 'Sign Up', href: '/auth/signup' }
        ]
      })
    }
});


router.get('/signin', async (req, res, next) => {
    res.render('signin', {
      breadcrumb: [
        { item: 'Sign In', href: '/auth/signin' }
      ]
    });
});


router.post('/signin', [
  body('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail(),
  body('password', 'Password must be minimum 5 characters')
    .isLength({ min: 5 })
], async (req, res, next) => {
  let { errors } = validationResult(req)
  
  if(errors.length !== 0) {
    let errorsMessages = errors.map(a => a.msg);
    //Remove duplicates messages
    errorsMessages = [...new Set(errorsMessages)];
    res.render('signin', {
      errorsMessages: errorsMessages,
      breadcrumb: [
        { item: 'Sign In', href: '/auth/signin' }
      ]
    })
  }

  const { status, data } = await signIn(new User('', req.body.email, req.body.password ));

  if(status === 200){
    res.cookie("logged_user", data, {
      httpOnly: true,
      maxAge: 1800000,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax'
    }).status(200).redirect('/');
  }else{
    res.render('signin', {
      errorsMessages: [data.error],
      breadcrumb: [
        { item: 'Sign In', href: '/auth/signin' }
      ]
    })
  }
});


router.post('/logout',  (req, res, next) => {
  res
    .clearCookie("logged_user")
    .status(200)
    .redirect('/');
});
export default router;