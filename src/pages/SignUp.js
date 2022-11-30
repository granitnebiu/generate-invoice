import React, { useEffect, useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import axios from "axios";
import { toast } from "react-toastify";

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
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      <div className="mt-16">
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
      </div>

      <Button btnType="submit" btnName=" Sign Up" />

      <p className="forgot-password text-right">
        Already registered <a href="/sign-in">sign in?</a>
      </p>
    </form>
  );
}
