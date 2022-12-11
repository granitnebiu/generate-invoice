import React from "react";

export default function Footer() {
  return (
    <>
      <div className="flex justify-between">
        <div className="w-96">
          <p className="text-[14px]">Reklamacije se uvažavaju 7 dana po prijemu robe.</p>
          <div className="w-48 py-8 text-center">
            <p className="text-[14px]">Gezim Memishi</p>
            <div className="mt-6 h-[1px] w-48 bg-gray-500"></div>
            <p className="text-[14px]">račun i robu izdao</p>
          </div>
        </div>
        <div className="flex w-96 justify-end">
          <div className="w-48 py-8 text-center">
            <div className="mt-6 h-[1px] w-48 bg-gray-500"></div>
            <p className="text-[14px]">robu primio</p>
            <div className="mt-6 h-[1px] w-48 bg-gray-500"></div>
            <p className="text-[14px]">Broj lične karte i mesto izdavanja</p>
          </div>
        </div>
      </div>
      <div className="my-6 h-2 w-full bg-red-700"></div>
      <footer className="border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center space-x-2">
          <li className="space-x-1">
            <span className="">Matični broj: </span>
            <span className="font-bold">63814962</span>
          </li>
          <li className="space-x-1">
            <span className="normal-case">Šifra delatnosti: </span>
            <span className="font-bold">4520.7711</span>
          </li>
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
    </>
  );
}
