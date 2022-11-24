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

app.listen(port, () => {
  console.log(`Server is running son ${port}`);
});
