const User = require('../models/User');
const { validationResult } = require("express-validator");

//bunch of functions
//Signup function
const sign_up = async (req,res,next) => {

  const { username, email, password } = req.body;
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors.array().forEach((error => {
        res.status(400).json({
          error: true,
          message: error.msg
        });
      }))
      console.log('error');
    }
    const user = await User.create({
      username, email, password,
    });
    //console.return sendToken(user, 201, res)
    return res.status(200).json(user);

  } catch (error) {
    next(error);
  }
  
};


module.exports = {
sign_up,
};