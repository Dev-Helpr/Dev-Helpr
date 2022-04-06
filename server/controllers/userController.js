require("dotenv").config();
const db = require("../model/devHelprModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Generate a JWT
const generateAccessToken = (id) =>
  jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });
const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.REFRESH_TOKEN_SECTRET, {
    expiresIn: "1d",
  });

const userExistsInDB = async (req, res, next) => {
  console.log(req.body);
  const text = `SELECT * FROM Users WHERE users.email = $1;`;
  const values = [req.body.email];
  //check if email is already registered in DB
  const checkIfUserExist = await db.query(text, values);
  console.log(
    " OUR DB OUTPUT AFTER CHECKING IF EMAIL EXISTS:  ",
    checkIfUserExist.rows
  );
  //if query returns a non-empty array (meaning the account was successfully queried on our database and therefore already exists) then save in res.locals.existingUser as true
  console.log("length:  ", checkIfUserExist.rows.length);
  if (checkIfUserExist.rows.length) {
    res.locals.existingUser = true;
    console.log("res.locals.existingUser =  ", res.locals.existingUser);
    return next();
  }
  //else the query returns an empty array, then it is not already in use within our DB, therefore we should save res.locals.existingUser to false
  res.locals.existingUser = false;
  console.log("res.locals.existingUser =  ", res.locals.existingUser);
  return next();
};

const handleNewUser = async (req, res) => {
  //check if user exists in our DB already - userExistsInDB middleware should be ran before this middleware
  if (res.locals.existingUser) return res.status(200).json(false);

  const { userName, email, password } = req.body;

  try {
    //encrypt the password with bcrypt and salt 10
    const hashedPwd = await bcrypt.hash(password, 10);
    //store the new user into DB
    const text = `INSERT INTO Users (userName, email, online, status, password) VALUES ($1, $2, $3, $4, $5);`;
    const values = [userName, email, true, "neutral", hashedPwd];
    await db.query(text, values);

    return res.status(201).json(true);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleSignIn = async (req, res) => {
  const { email, password } = req.body;
  //check if user exists in our DB already - userExistsInDB middleware should be ran before this middleware
  //if user does not exist in DB - return false
  if (!res.locals.existingUser) res.status(200).json(false);
  const text = `SELECT * FROM Users WHERE users.email = $1`;
  const values = [email];
  //fetch user info from db
  const user = await db.query(text, values);
  // console.log('USER:  ',user.rows)
  // console.log('USER.PASSWORD: ',user.rows[0].password)
  // console.log('REQ.BODY PWD: ',password)
  if (await bcrypt.compare(password, user.rows[0].password)) {
    //create our Access & Refresh JWTs
    const accessToken = generateAccessToken(user.rows[0]._id);
    const refreshToken = generateRefreshToken(user.rows[0]._id);
    //store refresh token in cookies httpOnly for 1 day maxAge
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    //save refresh token to DB for matching and/or option to log out and denying access until sign in again
    db.query(
      `UPDATE users SET refreshtoken = '${refreshToken}' WHERE users._id = ${user.rows[0]._id};`
    );
    return res.status(200).json({
      id: user.rows[0]._id,
      userName: user.rows[0].username,
      password: '',
      email: user.rows[0].email,
      online: true,
      status: "neutral",
      accessToken: accessToken,
    });
  }
  res.status(200).json("username or password incorrect");
};

const handleLogOut = async (req, res) => {
  //will want to add deletion of accessToken on front-end if saved there

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  //check if current refreshToken is in our user's DB
  const text = `SELECT users.username, users._id FROM users WHERE users.refreshToken = $1;`;
  const values = [refreshToken];
  const user = await db.query(text, values);
  //if user not found in DB, clear cookies of token anyways
  if (!user.rows.length) {
    //have to pass in the same options the cookie was set with or clearCookie will not work
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  //delete refreshToken in DB
  db.query(
    `UPDATE users SET refreshtoken = Null WHERE users._id = ${user.rows[0]._id};`
  );
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);
};

module.exports = {
  handleNewUser,
  userExistsInDB,
  handleSignIn,
  generateAccessToken,
  handleLogOut,
};
