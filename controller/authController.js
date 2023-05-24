const User = require('./../model/user');
const JWT = require('jsonwebtoken');
const util = require('util');
const bcrypt = require('bcrypt');
const generateToken = (id) => {
  const token = JWT.sign({ id }, process.env.jwtSecret, {
    expiresIn: `900000`,
  });

  return token;
};

const signUp = async (req, resp, next) => {
  try {
    //no control what data is being send to server.
    // const user = await User.create(req.body);

    const user = await User.create({
      name: req.body.name,
      photo: req.body.photo || null,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
    });

    resp.status(201).json({
      status: 'successful',
      data: { user },
      token: generateToken(user.id),
    });
  } catch (error) {
    error.status = 404;
    error.message = error.message || 'invalid signup';
    next(error);
  }
};

const signIn = async (req, resp, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userData = await User.findOne({ email }).select('+password');
    // console.log(userData);

    if (
      !email ||
      !password ||
      !(await bcrypt.compare(password, userData.password))
    ) {
      throw new Error('invalid user || password');
    }
    resp.status(200).json({ token: generateToken(userData._id) });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const tokenVerification = async (req, res, next) => {
  try {
    let authenticToken = req.headers.authorization;
    if (authenticToken && authenticToken.startsWith('Bearer ')) {
      authenticToken = authenticToken.split(' ')[1];

      const decoded = await util.promisify(JWT.verify)(
        authenticToken,
        process.env.jwtSecret
      );
      // console.log(decoded);
      // Check if the user still exists in the database
      const newUser = await User.findById(decoded.id);
      if (!newUser) {
        throw new Error('User no longer exists');
      }

      // Check if the user has changed their password after the token was issued
      if (newUser.changedPasswordAfter(decoded.iat)) {
        throw new Error('Please revalidate your credentials');
      }

      req.user = newUser;
      next();
    } else {
      return next(new Error('Not authenticated'));
    }
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

module.exports = { signUp, signIn, tokenVerification };
