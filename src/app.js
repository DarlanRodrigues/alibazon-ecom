import createError from 'http-errors';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import { init, startTransaction, captureException } from '@sentry/node';
import Tracing from "@sentry/tracing";
import config from "../config.js"


const __dirname = dirname(fileURLToPath(import.meta.url));


init({
  dsn: config.sentry.url,
  tracesSampleRate: 1.0,
});

import homeRouter from './routes/Home.route.js';
import usersRouter from './routes/users.js';
import productsRouter from './routes/Product.route.js';
import categoryRouter from './routes/Category.route.js';
import authRouter from './routes/Auth.route.js';

var app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(['/', '/home'], homeRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/category', categoryRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
