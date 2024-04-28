const { check } = require("../utils/bcrypt")
const jwt = require("jsonwebtoken");

const User = require("../Model/User");
const bcrypt = require("bcryptjs");



exports.loginUser = async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ userName: userName });
  if (!user)
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Incorrect email",
    });

  if (!check(password, user.password))
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Incorrect password",
    });

  const token = jwt.sign({ _id: user._id, userName: user.userName }, "waqas1234", {
    expiresIn: "700h",
  });

  return res.status(200).json({
    success: true,
    status: 200,
    message: "User logged in successfully",
    user: {
      _id: user._id,
      email: user.email,
      username: user.userName,


      token,
    },
  });
};


exports.signupUser = async (req, res, next) => {


  try {
    const { email, userName, password, confirm_password } = req.body;

    // Check if passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the email is already registered
    const isEmailUnique = await User.findOne({ email });
    if (isEmailUnique) {
      return res.status(400).json({
        success: false,
        status: 400,
        type: "email",
        message: "Email already exists",
      });
    }
    // Check if the email is already registered
    const isUserNameUnique = await User.findOne({ userName });
    if (isUserNameUnique) {
      return res.status(400).json({
        success: false,
        status: 400,
        type: "userName",
        message: "User name already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,

    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
      },
      "waqas1234", // Replace with a secure secret key
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      status: 200,
      message: "User signed up successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,

        token,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: "Internal server error",
    });
  }
};