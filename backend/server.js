const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;
app.use(express.json());

//adding package Cross-Origin Resource Sharing
//to communicate front with backend
const cors = require("cors");
app.use(cors());
//encrypting password
const bcrypt = require("bcryptjs");

//to generate token
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hjskdfhsdj12789gggggyytyte3s7892334sadwq3234r43gf././/.23324/fdgfdg878";
//connect to MongoDB
const mongoUrl =
  "mongodb+srv://granit:Granit123@cluster0.a4ej3ei.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to database");
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
//creating new user
const User = mongoose.model("UserInfo");
//api for registering a user
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
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
      email: email,
      password: encryptedPassword,
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
  console.log(user);
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

app.listen(port, () => {
  console.log(`Server is running son ${port}`);
});
