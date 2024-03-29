import React, { useRef, useState } from "react";

//validations forimport { useForm } from 'react-hook-form'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Input from "src/components/Input";
import Button from "src/components/Button";
import axios from "src/utils/axios";

import LOGO from "../../src/images/logo-ximi.png";
import { AiFillLock, AiOutlineLogin } from "react-icons/ai";

const loginValidation = Yup.object({
  email: Yup.string().email().required("Email je obavezan"),
  password: Yup.string().required("Lozinka je obavezna"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formRef = useRef();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const submitLoginForm = (data) => {
    const LoginUser = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/login-user", LoginUser)
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          toast.success("Korisnik je prijavljen");
          window.localStorage.setItem("token", response.data.token);
          const interval = setInterval(() => {
            window.location.href = "./invoice";
          }, 2000);
          return () => clearInterval(interval);
        }
        formRef.current.reset();
        // reset({ email: "", password: "" });
        // console.log(response.data.error);
        toast.error(response.data.error);
      })
      .catch(function (error) {
        // console.log(error);
      });

    // console.log(addUser);
  };

  return (
    <div className="flex h-screen w-screen  items-center justify-center">
      <div className="flex w-[85%] flex-col items-center justify-center space-y-10 rounded-xl bg-white p-16 shadow-xl md:w-auto ">
        <img src={LOGO} alt="logo auto ximi" className=" h-auto w-64" />
        <h3 className="text-2xl font-bold text-primary">Prijavite se</h3>
        <form
          ref={formRef}
          className="w-64 md:w-96"
          autoComplete="off"
          onSubmit={handleSubmit(submitLoginForm)}
        >
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            label="Vaša e-pošta"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            register={{ ...register("email") }}
            error={errors.email}
          />

          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            label="Tvoja lozinka"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            register={{ ...register("password") }}
            error={errors.password}
          />

          <Button btnName="Submit" btnType="submit" />
          <div className="mt-4 flex flex-col justify-between gap-y-2 md:flex-row md:gap-y-0">
            <p className="forgot-password select-none ">
              <a className="flex items-center gap-x-1 hover:text-primary" href="/forgot-password">
                <AiFillLock /> Zaboravili ste lozinku
              </a>
            </p>
            <p className="forgot-password select-none ">
              <a className="flex items-center gap-x-1 hover:text-primary" href="/sing-up">
                <AiOutlineLogin /> Registrujte korisnika
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
