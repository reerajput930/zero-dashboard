const mongoose = require('mongoose')
// for hashing the password
const bcrypt = require("bcrypt");
// for validation
const validator = require("validator");

const registerationStructure = mongoose.Schema({
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    }, 
    linkedin: {
      type: String, 
      require: true,
      
    },
    userdesc: String,
    status: {
      type: String,
      
    },
    password: {
      type: String,
      require: true,
    },
    date: { type: Date, default: Date.now },
    image: "String",
  });
  
  //  in mongodb model we have option like create and find
  //  but in addition we can create our own function
  
  // in this static method converting our password to hash for security resons(which could also be done in controller in addprofile)  
  registerationStructure.statics.signup = async function (
    firstName,
    lastName,
    linkedin,
    userdesc,
    status,
    image,
    email,
    password
  ) {
    //  here can not use the model before creation
    // therfore ,used the this
    const exists = await this.findOne({ email });
  
    if(!email || !password || !firstName||!userdesc){
      throw Error("All field Must be Filled!")
    }
  
    if (!validator.isEmail(email)) {
      throw Error("Write Valid Email Id!");
    }
   
  
    if (!validator.isStrongPassword(password)) {
      throw Error("Password must contain: UpperCase,LowerCase,Number and Expression");
    }
  
    if (exists) {
      throw Error("Email already in use");
    }
  
    //  converting the password into hash (using genSalt and hash)
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
  
    // ================================================
  
    const user = await this.create({
      firstName,
      lastName,
      linkedin,
      userdesc,
      status,
      image,
      email,
      password: hash,
    });
  
    return user;
  };
  

  // creating the one more static file for the login
registerationStructure.statics.login = async function(email,password){
  if(!email || !password){
    throw Error("All field Must be Filled!")
  }
  const user = await this.findOne({email})
  
  if(!user){
    throw Error("Incorrect Email Id!")
  }
  // console.log(user)
  const match = await bcrypt.compare(password, user.password)
  if (!match) { 
    throw Error('Incorrect password')
  }

  return user

}

  

const registerationModel = mongoose.model("User", registerationStructure);

module.exports = registerationModel