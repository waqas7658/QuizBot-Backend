const bcrypt = require("bcryptjs");

const { hashSync, compareSync } = bcrypt;

exports.check = (password, hashedpassword) =>
    compareSync(password, hashedpassword);

