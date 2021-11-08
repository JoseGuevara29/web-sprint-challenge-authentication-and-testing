const Users = require("../users/user-model");
const bcrypt = require("bcryptjs");

const checkPayload = (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log("checkPayload", username, password);
    if (!username || !password) {
      res.status(404).json({ message: "username and password required" });
    } else {
      req.username = username;
      req.password = password;
      next();
    }
  } catch (err) {
    // console.log(req.body);
    next(err);
  }
};

const checkForDuplicates = async (req, res, next) => {
  try {
    const user = await Users.findByUsername(req.body.username);
    // console.log("checkForDuplicates findByUsername user: ", user);
    if (!user.length) {
      next();
    } else {
      res.status(400).json({
        message: "Username is taken. Please use another username.",
      });
    }
  } catch (err) {
    next(err);
  }
};

const validateUser = async (req, res, next) => {
  try {
    const user = await Users.findByUsername(req.body.username);

    if (!user) {
      // console.log("validate user: ", user);
      res.status(401).json({
        message: "invalid credentials",
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkPayload, checkForDuplicates, validateUser };
