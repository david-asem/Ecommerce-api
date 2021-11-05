const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please provide a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      unique: true,
      match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
      select: false
    
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps:true,
  }
  //resetPasswordToken: String,
  //resetPasswordExpire:Date
);

//before a user is saved.
UserSchema.pre("save", async function (next) {
    let salt;
    if (!this.isModified("password")) {
     next();
   } else {
     salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password,
       salt);
     next();
   }
});
 

UserSchema.methods.hashPassword = async function (password) {
  let salt;
  if (!this.isModified("password")) {
    next();
  } else {
    salt = await bcrypt.genSalt(10);
    return password = await bcrypt.hash(this.password,
      salt);
     
  }
}



// compare db password with given password
 UserSchema.methods.matchPasswords = async function(password){
 return await bcrypt.compare(password, this.password)
 };

//create token
UserSchema.methods.getSignedToken = async()=> {
  const accessToken = jwt.sign({ id: this._id, isAdmin:this.isAdmin }, process.env.JWT_SECRET, {
 expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  
  return accessToken;
 };

// //get resetpassword token
// UserSchema.methods.getResetPasswordToken = async function () {
//   const resetToken = crypto.randomBytes(40).toString('hex');

//   this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

//   return resetToken;

// }

 //create user
const User = mongoose.model("User", UserSchema);

module.exports = User;