const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "Passwords don't match",
    },
  },
  photo: {
    type: String,
    default: 'user-photo-default',
  },
  email: {
    type: String,
    required: [true, 'Email must be provided'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'Invalid email address',
    },
  },
  passwordChangedAt: {
    type: Date,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  this.passwordConfirmation = null;
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.changedPasswordAfter = function (jwtTime) {
  if (!this.passwordChangedAt) return false;
  return this.passwordChangedAt.getTime() <= jwtTime * 1000;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
