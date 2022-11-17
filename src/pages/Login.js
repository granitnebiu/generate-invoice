import React from "react";

export default function Login() {
  return (
    <div className="login">
      <h1 className="text-center">Choose a Login Method</h1>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className=" google">
            <img src="" alt="" className="icon" />
            Google
          </div>
          <div className=" facebook">
            <img src="" alt="" className="icon" />
            Facebook
          </div>
          <div className=" github">
            <img src="" alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="">
          <p className="or">OR</p>
        </div>
        <div className="flex flex-col">
          <input type="text" className="w-full" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
}
