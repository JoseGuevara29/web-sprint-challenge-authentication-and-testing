const db = require("../../data/dbConfig");

function find() {
  return db("users");
}

function findById(user_id) {
  return db("users").where("id", user_id).first();
}

function findByUsername(username) {
  return db("users").where("username", username);
}

function validatePassword(password) {
  return db("users").where("password", password);
}

async function insert(user) {
  const user_id = await db("users").insert(user);
  return findById(user_id);
}

module.exports = { find, findById, findByUsername, validatePassword, insert };
