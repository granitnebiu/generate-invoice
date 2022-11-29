import React, { useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import axios from "axios";
import { BsWindowSidebar } from "react-icons/bs";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const LoginUser = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:5000/login-user", LoginUser, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          alert("login successfully");
          window.localStorage.setItem("token", response.data.token);
          window.location.href = "./invoice";
        }
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(addUser);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <div className="mt-16">
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

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="customCheck1" />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <Button btnName="Submit" btnType="submit" />

      <p className="forgot-password text-right">
        <a href="/sing-up">Sing Up</a>
      </p>
    </form>
  );
}
