const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('../../node_modules/validator');
const NotAuthError = require('../errors/not-auth-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(url),
      message: 'Введите URL',
    },
  },
  email: {
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Введите корректный email',
    },
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAuthError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAuthError('Неправильные почта или пароль');
          }
          return user; // аутентификация успешна
        });
    });
};

module.exports = mongoose.model('user', userSchema);
