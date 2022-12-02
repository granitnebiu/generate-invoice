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

//to generate json token
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hjskdfhsdj12789gggggyytyte3s7892334sadwq3234r43gf././/.23324/fdgfdg878";
//connect to MongoDB
const mongoUrl =
  "mongodb+srv://granit:Granit123@cluster0.a4ej3ei.mongodb.net/?retryWrites=true&w=majority";

//connected to MongoDB
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
//creating new user Importing user model
const User = mongoose.model("UserInfo");
//api for registering a user
app.post("/register", async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;
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
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${userExists.id}/${token}`;
    console.log(link);

    //send response to user
    if (userExists) {
      return res.json({ status: "Reset Password Sended", info: "ok" });
    }
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
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
    res.send("verified");
  } catch (error) {
    res.send("not verified");
  }
});
