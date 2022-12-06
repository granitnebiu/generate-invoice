import React, { useState } from "react";
//validations forimport { useForm } from 'react-hook-form'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
//notifications
import { toast } from "react-toastify";
import axios from "axios";

import Input from "src/components/Input";
import Button from "src/components/Button";

import LOGO from "../../src/images/logo-ximi.png";
import { AiOutlineLogin, AiOutlineUser } from "react-icons/ai";

const forgetPasswordValidations = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgetPasswordValidations),
  });

  const submitForgetPassword = (data) => {
    const userEmail = {
      email: data.email,
    };
    axios
      .post("http://localhost:5000/forgot-password", userEmail, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        console.log(response);
        if (response.data.info === "ok") {
          toast.success(response.data.status);
        } else {
          toast.error(response.data.status);
        }
      })
      .catch(function (error) {
        console.log("this is error" + error);
        toast.error(error.data.error);
        // console.log(error);
      });

    // console.log(addUser);
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-10">
      <img src={LOGO} alt="logo auto ximi" className=" h-auto w-64" />
      <h3 className="text-2xl font-bold text-primary">Forgot Password</h3>
      <form className="w-96" autoComplete="off" onSubmit={handleSubmit(submitForgetPassword)}>
        <Input
          type="email"
          name="email"
          id="email"
          value={email}
          label="Your Email"
          onChange={(e) => setEmail(e.target.value)}
          register={{ ...register("email") }}
          error={errors.email}
        />

        <Button btnName="Submit" btnType="submit" />
        <div className="mt-4 flex justify-between">
          <p className="forgot-password select-none ">
            <a className="flex items-center gap-x-1 hover:text-primary" href="/sign-in">
              <AiOutlineUser /> Sign In
            </a>
          </p>
          <p className="forgot-password select-none ">
            <a className="flex items-center gap-x-1 hover:text-primary" href="/sing-up">
              <AiOutlineLogin /> Register User
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
