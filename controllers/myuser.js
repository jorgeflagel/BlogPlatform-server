const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

// loading models
const User = require('../models/user');
const Article = require('../models/article');

// loading env variables
dotenv.config();

// https://medium.com/edgar-talledos/parte-1-autenticaci%C3%B3n-por-medio-de-api-con-jwt-expressjs-reactjs-y-react-native-b557167f1440

const signup = async (req, res) => {
    const { password, passwordConfirmation, email, username } = req.body;

    if (password === passwordConfirmation) {
      // creating new user
      const newUser = User({
        // Encripting password
        password: Bcrypt.hashSync(password, 10),
        email,
        username,
      });
      // saving new user in database
      try {
        const savedUser = await newUser.save();

        // creating jwtoken
        const token = jwt.sign(
          { email, id: savedUser._id, username },
          process.env.TOKEN_SECRET,
          { expiresIn: process.env.TOKEN_EXPIRES_IN },
        );

        // sending token to client
        res.status(201).json({ token, user:{username: savedUser.username, email: savedUser.email, _id: savedUser._id, position: savedUser.position, resume: savedUser.resume, profileImageUrl: savedUser.profileImageUrl} });

      } catch (err) {
        res.status(400).json({message: err.message});
      }
  }
  // if password and confirmation password are not the same
  else {
    res.status(400).json({message: '¡The passwords do not match, try again !'});
  }
};

const login = async (req, res) => {

  const { password, username } = req.body;
  console.log(username);
  console.log(password);
  try {
    // searching user in database
    const userRecord = await User.findOne({ username });
    
    if (userRecord) {
        // comparing username and password with user saved in database 
        if (Bcrypt.compareSync(password, userRecord.password)) {
          // signing token
          const token = jwt.sign(
            { email: userRecord.email, id: userRecord._id, username },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.TOKEN_EXPIRES_IN },
          );
          // sending token to database
          res.status(200).json({ token, user: {username: userRecord.username, email: userRecord.email, _id: userRecord._id, position: userRecord.position, resume: userRecord.resume, profileImageUrl: userRecord.profileImageUrl}});
        }
        else {
          res.status(401).json({message: '¡Tu email o contraseña son incorrectos, por favor, veríficalo!'});
        }
    }
    else {
      res.status(401).json({message: '¡Tu email o contraseña son incorrectos, por favor, veríficalo!'});
    }
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

const getUserByToken = async (req, res, next) => {
    try {
      user = await User.findOne({_id: req.user.id}, {password: 0});
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  }
  
const updateUserById = async (req, res, next) => {
    try {
        let user = await User.findOneAndUpdate({_id: req.user.id}, req.body, {new: true});
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const uploadImageProfile = async (req, res, next) => {
  if(req.body.image) {
    try {
      const fileStr = req.body.image;
      console.log(cloudinary.uploader);
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        public_id: `blogplatform/profiles/${req.user.id}`,
        overwrite: true,
        });
      console.log(uploadedResponse.url);
      req.body.profileImageUrl = uploadedResponse.url;
      next();
    } catch (error) {
      console.log(error);
      res.status(400).json({...error, message: error.statusText, });
    }
  } else {
    req.body.profileImageUrl = null;
    next();
  }
  
}

module.exports = { getUserByToken, updateUserById, login, signup, uploadImageProfile };