const bcrypt = require('bcrypt');
const { rawListeners } = require('../model/user');

const getAllUser = (req, resp) => {
  resp.status(500).json({
    status: 'failed',
    message: 'api route not implemented',
  });
};

const getUserById = (req, resp) => {
  resp.status(500).json({
    status: 'failed',
    message: 'api route not implemented',
  });
};

const deleteUserById = (req, resp) => {
  resp.status(500).json({
    status: 'failed',
    message: 'api route not implemented',
  });
};

const updateUserById = async (req, resp, next) => {
  try {
    if (!req.user) throw Error('user not available');
    const user = req.user;
    // console.log('patch', user);
    user.name = req.body.name || user.name;
    user.photo = req.body.photo || user.photo;
    user.email = req.body.email || user.email;
    if (req.body.password != null && req.body.password.trim() !== '') {
      user.password = req.body.password;
      user.passwordConfirmation = req.body.passwordConfirmation;
      user.passwordChangedAt = Date.now();
    } else {
      user.password=user.password;
      user.passwordConfirmation = user.password;
    }
    console.log(user);
    const data = await user.save();
    resp.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  } catch (error) {
    error.status = 500;
    // error.message = "can't update the user";
    next(error);
  }
};

const getUser = (req, resp) => {
  resp.status(500).json({
    status: 'failed',
    message: 'api route not implemented',
  });
};

const addNewUser = (req, resp) => {
  resp.status(500).json({
    status: 'failed',
    message: 'api route not implemented',
  });
};

module.exports = {
  getAllUser,
  getUser,
  getUserById,
  deleteUserById,
  addNewUser,
  updateUserById,
};
