const User = require('../models/User')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')
const path = require('path')

const registerController = async (req, res, next) => {
  const { firstName, lastName, age, gender, email, password } = req.body
  try {
    //check if the email already exists
    //if exists
    const isUserEmailExists = await User.findOne({ email })
    if (isUserEmailExists) {
      return res
        .status(400)
        .json({ success: false, error: 'User already exists' })
    }

    //before saving user to database has the password
    /*
    process to convert a value to another 
    one way process
    */

    await User.create({
      firstName,
      lastName,
      age,
      gender,
      email,
      password,
    })

    res.status(200).json({
      sucess: true,
    })
  } catch (err) {
    next(err)
  }
}

const loginController = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: 'Email or password is Missing' })
  }

  try {
    //check id the emnail associate user exists or not
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid Email or Password' })
    }

    const isMatch = await user.checkPassword(password)
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid email or Password' })
    }
    //provide a key(jwt - json web token)
    const token = jwt.sign(
      { email: user.email, userId: user._id, roles: user.roles },
      process.env.JSON_WEB_TOKEN,
      {
        expiresIn: '10d',
      }
    )

    const data = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      gender: user.gender,
      token,
    }
    res.status(200).json({ success: true, data })
  } catch (err) {
    next(err)
  }
}

const dashboardController = async (req, res, next) => {
  const email = req.user.email
  const user = await User.find({ email })
  res.json({ success: true, data: user })
}

const updateProfile = async (req, res, next) => {
  //https://facebook.com/imageDirectory/image
  try {
    const { firstName, lastName, gender } = req.body
    const file = req.file

    const profile = new Profile({
      firstName,
      lastName,
      gender,
      profilePic: file.filename,
      user: req.user.userId,
    })

    await profile.save()

    return res.status(201).json({
      success: true,
      data: profile,
    })
  } catch (err) {
    next(err)
  }
}

const serveImage = async (req, res, next) => {
  try {
    const { imgName } = req.params
    const imageExists = await Profile.findOne({
      profilePic: imgName,
    })

    //check if the image exists or not
    if (!imageExists) {
      return res.status(404).json({
        success: false,
        err: 'Image Not Found',
      })
    }

    const filePath = path.join(__dirname, '..', 'images', imgName)

    res.sendFile(filePath)
  } catch (err) {
    next(err)
  }
}
module.exports = {
  registerController,
  loginController,
  updateProfile,
  serveImage,
  dashboardController,
}
