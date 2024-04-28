const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, "waqas1234", { expiresIn: "7d" });
};

module.exports = generateToken;
