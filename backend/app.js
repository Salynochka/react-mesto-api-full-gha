const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('./node_modules/cookie-parser');
const { requestLogger, errorLogger } = require('./public/middlewares/logger');
const routerCards = require('./public/routes/cards');
const routerUsers = require('./public/routes/users');
const { login, createUser } = require('./public/controllers/users');
const { auth } = require('./public/middlewares/auth');
const { validateRegister, validateLogin } = require('./public/middlewares/validate');
const errorHandler = require('./public/middlewares/error-handler');
const NotFoundError = require('./public/errors/not-found-error');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
}).then(() => {
  console.log('connected to db');
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use(auth);

app.use('/cards', routerCards);
app.use('/users', routerUsers);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
