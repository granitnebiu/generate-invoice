import React from "react";

export default function Footer({ email, name, website, bankName, phone, bankAccount }) {
  const rangeNumber = Math.floor(Math.random() * 9999) + 1;
  const rangeNumber2 = Math.floor(Math.random() * 9999999999) + 1;

  return (
    <>
      <footer className="border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center space-x-2">
          <li className="space-x-1">
            <span className="">Matični broj: </span>
            <span className="font-bold">63814962</span>
          </li>
          {/* <li className="space-x-1">
            <span className="normal-case">Šifra delatnosti: </span>
            <span className="font-bold">{rangeNumber}</span>
          </li> */}
          <li className="space-x-1">
            <span className="">PIB: </span>
            <span className="font-bold">108946375</span>
          </li>
          {/* <li className="space-x-1">
            <span className="normal-case">PDV: </span>
            <span className="font-bold">{rangeNumber2}</span>
          </li> */}
        </ul>
      </footer>
      <div className="my-6 h-4 w-full bg-red-700"></div>
    </>
  );
}
