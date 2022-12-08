require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const port = 5000;
app.use(express.json());
//to show html and javascript in nodejs
app.use(express.urlencoded({ extended: false }));

//adding package Cross-Origin Resource Sharing
//to communicate front with backend
const cors = require("cors");
app.use(cors());

//npm module used to process data sent in an HTTP request body
const bodyParser = require("body-parser");
//express-validator
const { check, validationResult } = require("express-validator");

//using css
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//encrypting password
const bcrypt = require("bcryptjs");

//to generate json token
const jwt = require("jsonwebtoken");
//send email from nodejs
var nodemailer = require("nodemailer");

const JWT_SECRET = process.env.ENCRYP_TOKEN;

//required by mongodb 7 and https://render.com/
mongoose.set("strictQuery", true);
//connect to MongoDB
const mongoUrl = process.env.MONGODB_CONNECTION;

//connected to MongoDB
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    // console.log("connected to database");
  })
  .catch((e) => console.log(e));

/***** BASIC API *****/
//creating basic api routes
app.post("/post", async (req, res) => {
  // console.log(req.body);
  const { data } = req.body;
  //send back response and handle error and success
  try {
    if (data === "granit") {
      res.send({ status: "OK" });
    } else {
      res.send({ status: "user not found" });
    }
  } catch (error) {
    res.send({ status: "something went wrong try again" });
  }
});

/**** SIGNUP USER ****/
//importing SCHEMA
require("./userDetails");
//creating new user Importing user model
const User = mongoose.model("UserInfo");
//api for registering a user

//basic api to get user informations
app.get("/users", async (req, res) => {
  User.find({}, function (err, usersLists) {
    if (err) {
      console.log(err);
    } else {
      res.json(usersLists);
    }
  });
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, mobile, email, password, confirmPassword } = req.body;
  //encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    //check if email exists once
    //to not allow multiple account with same email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ error: "User already register" });
    }
    await User.create({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      password: encryptedPassword,
      confirmPassword: encryptedPassword,
    });
    res.send({ status: "OK" });
  } catch (error) {
    res.send({ status: "something went wrong try again" });
  }
});

//login user
app.post("/login-user", async (req, res) => {
  //getting email and password
  const { email, password } = req.body;
  //check if the user exists or not
  const user = await User.findOne({ email });
  // console.log(user);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    //sign in and create new token with random string that we created JWT_SECRET
    const token = jwt.sign({ email: user.email }, JWT_SECRET);
    //201 means the request has been made successfully
    if (res.status(201)) {
      return res.json({
        status: "ok",
        token: token,
      });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "invalid password" });
});

//creating api to get user data (user logged in)
app.post("/userData", async (req, res) => {
  //getting the data base on token
  const { token } = req.body;
  try {
    //verifying the token
    const user = jwt.verify(token, JWT_SECRET);
    // console.log(user);
    const userEmail = user.email;
    User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

//creating api forget password
app.post("/forgot-password", async (req, res) => {
  //getting the user email
  const { email } = req.body;

  try {
    //finding the user with email
    const userExists = await User.findOne({ email });
    //checking if the user exists or not
    if (!userExists) {
      return res.json({ status: "User does not exists" });
    }

    //generating new token which will be sended to our user
    const secret = JWT_SECRET + userExists.password;
    //create the token
    const token = jwt.sign({ email: userExists.email, id: userExists.id }, secret, {
      expiresIn: "59m",
    });
    const link = `${process.env.LOCAL || process.env.PRODUCTION}/reset-password/${
      userExists.id
    }/${token}`;
    //send email from nodejs
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mailer.app.user@gmail.com",
        pass: "nvkvtpatwiozfcrg",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: userExists.email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    // console.log(link);

    //send response to user
    if (userExists) {
      return res.json({ status: "Reset password link send to email", info: "ok" });
    }
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  // console.log(req.params);
  const userExists = await User.findOne({ _id: id });
  if (!userExists) {
    return res.json({ status: "User does not exists" });
  }
  //we need the secret to verify if the secret belong to us or not
  const secret = JWT_SECRET + userExists.password;
  //checking if the user is the same within our database
  try {
    //using the function of jwt to verify
    const verify = jwt.verify(token, secret);
    res.render("index", {
      email: verify.email,
      status: "Password was not changed, something went wrong",
    });
  } catch (error) {
    res.sendStatus(404);
  }
});

app.post(
  "/reset-password/:id/:token",
  [
    check("password")
      .exists({ checkFalsy: true })

      .withMessage("You must type a password")
      .isLength({ min: 7 })
      .withMessage("The password need to be more then 7 character"),
    check("confirmedPassword")
      .exists({ checkFalsy: true })

      .withMessage("You must type a confirmation password")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("The passwords do not match"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    const { id, token } = req.params;
    const { password } = req.body;
    const userExists = await User.findOne({ _id: id });
    if (!userExists) {
      return res.json({ status: "User does not exists" });
    }
    //we need the secret to verify if the secret belong to us or not
    const secret = JWT_SECRET + userExists.password;
    //checking if the user is the same within our database
    try {
      // if (errors.isEmpty()) {

      if (!errors.isEmpty()) {
        //using the function of jwt to verify email
        const verify = jwt.verify(token, secret);
        const alert = errors.array();
        res.render("index", { alert, email: verify.email, status: "failed" });
      } else {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = await bcrypt.hash(password, 10);
        await User.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              password: encryptedPassword,
              confirmPassword: encryptedPassword,
            },
          }
        );

        res.render("index", { email: verify.email, status: "password updated" });
      }
      // res.json({ status: "password updated" });
    } catch (error) {
      res.json({ status: "Something when wrong" });
    }
  }
);
