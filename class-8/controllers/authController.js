const User = require('../models/User')
const jwt = require('jsonwebtoken')

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

    const user = await User.create({
      firstName,
      lastName,
      age,
      gender,
      email,
      password,
    })

    res.status(200).json({
      sucess: true,
      data: user,
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
      { email: user.email, userId: user._id },
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
module.exports = {
  registerController,
  loginController,
  dashboardController,
}
