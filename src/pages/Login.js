import React, { useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import axios from "axios";
import { BsWindowSidebar } from "react-icons/bs";
import { toast } from "react-toastify";
import LOGO from "../../src/images/logo-ximi.png";

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
          toast.success("User logged in");
          window.localStorage.setItem("token", response.data.token);
          const interval = setInterval(() => {
            window.location.href = "./invoice";
          }, 2000);
          return () => clearInterval(interval);
        }
        // console.log(response.data.error);
        toast.error(response.data.error);
      })
      .catch(function (error) {
        // console.log(error);
      });

    // console.log(addUser);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-10">
      <img src={LOGO} alt="logo auto ximi" className=" h-auto w-64" />
      <h3 className="text-2xl font-bold text-primary">Sign In</h3>
      <form className="w-96" autoComplete="off" onSubmit={handleSubmit}>
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

        <div className="mb-3 flex select-none space-x-3">
          <input type="checkbox" className="custom-control-input" id="remember_me" />
          <label className="custom-control-label" htmlFor="remember_me">
            Remember me
          </label>
        </div>

        <Button btnName="Submit" btnType="submit" />

        <p className="forgot-password select-none text-right">
          <a className="hover:text-primary" href="/sing-up">
            Register User
          </a>
        </p>
      </form>
    </div>
  );
}
