const jwt = require('jsonwebtoken');
const User = require('../models/User');


async function verifyToken(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
     token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'Not authenticated'
    });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          return res.status(403).json({ error: true, message: 'Token is invalid' });
          
        }
        else {
          user = await User.findOne(user);
        req.user = user;
        next();
        }
        
      });
       
    } catch (error) {
      return res.status(500).json({ error: true, message: 'Server error' });
    }
  }
}


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user._id === req.params.id  || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("Not allowed to do that!");
    }
  });
};


const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (!req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!");
    }
  });
};



module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};