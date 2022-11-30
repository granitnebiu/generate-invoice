import React, { useEffect, useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import LOGO from "../../src/images/logo-ximi.png";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const addUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/register", addUser, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        toast.success("User has been registered");
        const interval = setInterval(() => {
          window.location.href = "./sign-in";
        }, 2000);
        return () => clearInterval(interval);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(addUser);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
      <img src={LOGO} alt="logo auto ximi" className=" h-auto w-64" />
      <h3 className="text-2xl font-bold text-primary">Register User</h3>
      <form className="w-96" autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          value={firstName}
          label="Your First Name"
          required={true}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          name="lastName"
          id="lastName"
          value={lastName}
          label="Your Last Name"
          required={true}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          label="Your Email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          label="Your Password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button btnType="submit" btnName=" Sign Up" />

        <p className="forgot-password text-right">
          Already registered{" "}
          <a className="font-medium text-primary hover:text-gray-500" href="/sign-in">
            sign in?
          </a>
        </p>
      </form>
    </div>
  );
}
