import React, { useEffect, useRef, useState } from "react";
//validations forimport { useForm } from 'react-hook-form'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Input from "src/components/Input";
import Button from "src/components/Button";
import axios from "src/utils/axios";
import LOGO from "../../src/images/logo-ximi.png";

//sing up via phone number
import firebase from "src/utils/firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const auth = getAuth(firebase);

const singUpValidation = Yup.object({
  firstName: Yup.string().required("Ime je obavezno"),
  lastName: Yup.string().required("Vaše prezime je obavezno"),
  // mobiles: Yup.number().required("Phone number is required"),
  // otp: Yup.number().required("OTP is required"),
  email: Yup.string().email().required("Email je obavezan"),
  password: Yup.string().required("Lozinka je obavezna").min(7, "Lozinka mora da ima 7 znakova"),
  confirmPassword: Yup.string().required("Lozinka je obavezna ne odgovara"),
});

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyButton, setVerifyButton] = useState(false);
  const [verifyOtpButton, setVerifyOtpButton] = useState(false);
  const [otp, setOtp] = useState(false);
  const [showVerified, setShowVerified] = useState(false);

  const formRef = useRef();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(singUpValidation),
  });

  //Set up the reCAPTCHA verifier
  const onCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSendOTP();
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
    }
  };

  useEffect(() => {
    if (mobile.length >= 8 && mobile.length <= 10) {
      setVerifyButton(true);
    } else {
      setVerifyButton(false);
    }
  }, [mobile]);

  const ChangeMobile = (e) => {
    setMobile(e.target.value);
  };

  //Send a verification code to the user's phone
  const onSendOTP = () => {
    onCaptchaVerify();
    const phoneNumber = "+381" + mobile;
    // console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.info("OTP poslat");
        setVerifyOtpButton(true);
      })
      .catch((error) => {
        if (error) {
          toast.error("Greška; SMS nije poslat. Pokušali ste mnogo puta");
        }
      });
  };

  //Sign in the user with the verification code
  const VerifyCode = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;
        // console.log(user);
        toast.success("Verifikacija obavljena");

        setShowVerified(true);
        setVerifyOtpButton(false);
        // ...
      })
      .catch((error) => {
        toast.error(
          "Korisnik nije mogao da verifikuje broj telefona (neispravan verifikacioni kod??)"
        );
      });
  };

  const submitForm = (data) => {
    if (showVerified) {
      const addUser = {
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        email: data.email,
        password: data.password,
      };

      axios
        .post("/register", addUser)
        .then(function (response) {
          if (response.data.status === "OK") {
            toast.success("Korisnik je registrovan");
            formRef.current.reset();
            reset({
              fullName: "",
              lastName: "",
              mobile: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
            setMobile("");
            setShowVerified(false);
          } else {
            toast.error(response.data.error);
          }
          const interval = setInterval(() => {
            // window.location.href = "./sign-in";
          }, 2000);
          return () => clearInterval(interval);
          // console.log(response.data);
        })
        .catch(function (error) {
          toast.error(error);
        });
      // console.log(addUser);
    } else {
      toast.error("Molimo potvrdite broj telefona");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-[85%] flex-col items-center justify-center space-y-10 rounded-xl bg-white p-16 shadow-xl md:w-auto ">
        <img src={LOGO} alt="logo auto ximi" className=" h-auto w-64" />
        <h3 className="text-2xl font-bold text-primary">Registrujte korisnika</h3>
        {/* <form className="w-96" autoComplete="off" onSubmit={handleSubmit}> */}
        <form
          ref={formRef}
          className="w-64 md:w-96"
          autoComplete="off"
          onSubmit={handleSubmit(submitForm)}
        >
          <div id="recaptcha-container"></div>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            label="Tvoje ime"
            onChange={(e) => setFirstName(e.target.value)}
            register={{ ...register("firstName") }}
            error={errors.firstName}
          />
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            label="Tvoje prezime"
            onChange={(e) => setLastName(e.target.value)}
            register={{ ...register("lastName") }}
            error={errors.lastName}
          />
          {/* Phone Number */}
          <Input
            type="number"
            name="mobile"
            id="mobile"
            label="Vaš broj telefona"
            value={mobile}
            onChange={(e) => ChangeMobile(e)}
            showHelperText={true}
            // register={{ ...register("mobiles") }}
            // error={errors.mobile}
          />

          {verifyButton === true && (
            <Button
              extraClass={`${
                showVerified
                  ? "!bg-green-500 cursor-no-drop hover:!bg-green-300 !border-transparent"
                  : ""
              } w-full !p-1 mb-8 hover:!bg-gray-300 hover:border-transparent hover:text-black`}
              onClick={() => onSendOTP()}
              btnType="button"
              disabled={showVerified ? true : false}
              btnName={`${showVerified ? "Provereno" : "Pošalji OTP"}`}
            />
          )}
          {/* END OF PHONE NUMBER  */}
          {/* OTP  */}
          {verifyOtpButton === true && (
            <>
              <Input
                type="number"
                label="Vaš OTP"
                name="otp"
                id="otp"
                onChange={(e) => setOtp(e.target.value)}
                // register={{ ...register("otp") }}
                // error={errors.otp}
              />

              <Button
                extraClass={`w-full !p-1 mb-8 hover:!bg-gray-300 hover:border-transparent hover:text-black`}
                onClick={() => VerifyCode()}
                btnType="button"
                btnName="Proveriti OTP"
              />
            </>
          )}
          {/* END OF OTP  */}
          <Input
            type="email"
            name="email"
            id="email"
            value={email}
            label="Vaša e-pošta"
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
            onChange={(e) => setPassword(e.target.value)}
            register={{ ...register("password") }}
            error={errors.password}
          />
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            label="Potvrdi lozinku"
            onChange={(e) => setConfirmPassword(e.target.value)}
            register={{ ...register("confirmPassword") }}
            error={errors.confirmPassword}
          />
          <Button btnType="submit" btnName="Registrujte korisnika" />
          {/* <input type="submit" value="Sign Up" /> */}
          <p className="forgot-password mt-8 text-right md:mt-0">
            Već registrovani{" "}
            <a className="font-medium text-primary hover:text-gray-500" href="/sign-in">
              Prijavite se?
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
