import React, { useEffect, useState } from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import LOGO from "../../src/images/logo-ximi.png";

//sing up via phone number
import firebase from "src/utils/firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const auth = getAuth(firebase);

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyButton, setVerifyButton] = useState(false);
  const [verifyOtpButton, setVerifyOtpButton] = useState(false);
  const [otp, setOtp] = useState(false);
  const [showVerified, setShowVerified] = useState(false);

  //Set up the reCAPTCHA verifier
  const onCaptchaVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          onSendOTP();
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
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
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("otp sended");
        setVerifyOtpButton(true);
      })
      .catch((error) => {
        alert("you have tried to many times");
        // Error; SMS not sent
        // ...
      });
  };

  //Sign in the user with the verification code
  const VerifyCode = () => {
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        alert("Verification done");
        setShowVerified(true);
        setVerifyOtpButton(false);
        // ...
      })
      .catch((error) => {
        alert("Invalid OTP");
        // User couldn't sign in (bad verification code?)
        // ...
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (showVerified) {
      const addUser = {
        firstName: firstName,
        lastName: lastName,
        mobile: mobile,
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
    } else {
      alert("Please Verify Phone Number");
    }
    // console.log(addUser);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-8">
      <img src={LOGO} alt="logo auto ximi" className=" h-auto w-64" />
      <h3 className="text-2xl font-bold text-primary">Register User</h3>
      <form className="w-96" autoComplete="off" onSubmit={handleSubmit}>
        <div id="recaptcha-container"></div>
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
        {/* Phone Number */}
        <Input
          type="number"
          label="Your Phone Number"
          required={true}
          onChange={(e) => ChangeMobile(e)}
          showHelperText={true}
        />

        {verifyButton === true && (
          <Button
            extraClass={`${
              showVerified ? "!bg-green-500 !border-transparent" : ""
            } w-full !p-1 mb-8 hover:!bg-gray-300 hover:border-transparent hover:text-black`}
            onClick={() => onSendOTP()}
            btnType="button"
            btnName={`${showVerified ? "Verified" : "Send OTP"}`}
          />
        )}
        {/* END OF PHONE NUMBER  */}
        {/* OTP  */}
        {verifyOtpButton === true && (
          <>
            <Input
              type="number"
              label="Your OTP"
              required={true}
              onChange={(e) => setOtp(e.target.value)}
            />

            <Button
              extraClass={`w-full !p-1 mb-8 hover:!bg-gray-300 hover:border-transparent hover:text-black`}
              onClick={() => VerifyCode()}
              btnType="button"
              btnName="Verify OTP"
            />
          </>
        )}
        {/* END OF OTP  */}
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
