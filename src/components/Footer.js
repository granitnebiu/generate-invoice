import React from "react";

export default function Footer({ email, name, website, bankName, phone, bankAccount }) {
  return (
    <>
      <footer className="border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center space-x-2">
          <li className="space-x-1">
            <span className="font-bold">Your Name:</span>
            <span>{name}</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Your Email:</span>
            <span>{email}</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Phone:</span>
            <span>{phone}</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Bank:</span>
            <span>{bankName}</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Account holder:</span>
            <span>{name}</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Account number:</span>
            <span>{bankAccount}</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Website:</span>
            <span>
              <a href={website} target="_blank" rel="noopenner noreferrer">
                {website}
              </a>
            </span>
          </li>
        </ul>
      </footer>
    </>
  );
}
