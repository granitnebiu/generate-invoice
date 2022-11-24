import React from "react";
import Input from "src/components/Input";
import Button from "src/components/Button";

export default function Login() {
  return (
    <form>
      <h3>Sign In</h3>
      <div className="mt-16">
        <Input
          type="email"
          name="email"
          id="email"
          // value={email}
          label="Your Email"
          required="true"
          // onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          name="password"
          id="password"
          // value={password}
          label="Your Password"
          required="true"
          // onChange={(e) => setPassword(e.target.value)}
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
