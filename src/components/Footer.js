import React from "react";

export default function Footer() {
  return (
    <>
      <footer>
        <ul className="flex flex-wrap items-center justify-center space-x-2">
          <li className="space-x-1">
            <span className="font-bold">Your Name:</span>
            <span>Auto "ximi"</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Your Email:</span>
            <span>autoximi@gmail.com</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Bank:</span>
            <span>Bank Account</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Account holder:</span>
            <span>175464651000548</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Account number:</span>
            <span>175464651000548</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Website:</span>
            <span>https://www.autoximi.com</span>
          </li>
        </ul>
      </footer>
    </>
  );
}
