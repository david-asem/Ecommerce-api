const User = require('../models/User');
const { validationResult } = require("express-validator");
const ErrorHandler = require('../services/errorHandler');
const { verifyTokenAndAuthorization, verifyToken } = require('../middlewares/verifyToken');

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
    else {
      try {
        const user = await User.findOne({ email });

        if (user) {
        return res.status(400).json({
      error: true,
      message:'User already exists, please signup with a different email and username',
      });
        }
        else {
          const user = await User.create({
          username, email, password,
         });
        return sendToken(user,"register success", 201, res);
        }
       } catch (error) {
        next(error);
      }
      }
    
    

  } catch (error) {
    next(error);
  }
};

//sign in function
const sign_in = async (req, res, next) => {
    const { email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({
    error: true,
    message:'Please provide an email and a password'
    })
    
  } else {
    try {
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return res.status(401).json({
    error: true,
    message:'Invalid credentials'
    });
      }
      else {
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
          return res.status(401).json({
          error: true,
           message:'Invalid credentials'
          });
        } else {
          
          const { password, _id, createdAt, updatedAt, __v, ...otherDetails } = user._doc;
          return sendToken(user, "login success", 200, res);
          
        }
      }
    } catch (error) {
      return next(new ErrorHandler('Server error', 500));
    }
  }
}

//update user

const updateUserProfile = async (req, res, next) => {
  verifyTokenAndAuthorization(req, res, async () => {
    if (req.body.password) {
      req.body.password = await User.hashPassword(req.body.password).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.body.id, {
        $set: req.body
      }, { new: true })
        
      return res.status(200).json(updatedUser)
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: 'something went wrong',
      })
    }
      

  }
  )
}

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message:'user deleted',
    })
  } catch (error) {
    res.status(500).json({error:true, message:'there was an error'})
  }
}
  

const sendToken = async(user, message, statusCode, res)=> {
  const accessToken = await user.getSignedToken();
  return res.status(statusCode).json({
    success: true,
    message,
    accessToken,
  });
}


module.exports = {
  sign_up,
  sign_in,
  updateUserProfile,
  deleteUser,
};