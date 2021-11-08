const Users = require("../users/user-model");

const checkPayload = (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(404).json({ message: "username and password required" });
    } else {
      req.username = username;
      req.password = password;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkForDuplicates = async (req, res, next) => {
  try {
    const user = await Users.findByUsername(req.body.username);
    if (!user.length) {
      next();
    } else {
      return res.status(400).json({
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
    const password = await Users.validatePassword(req.body.password);
    if (!user || !password) {
      return res.status(401).json({
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
