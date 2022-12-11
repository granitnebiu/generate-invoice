import React from "react";
import LOGO from "../../src/images/logo-ximi.png";

export default function Header({
  name,
  address,
  postalCode,
  email,
  phone,
  website,
  bankName,
  bankAccount,
  bankAccount2,
}) {
  return (
    <>
      <header className="mb-5 flex flex-col items-center justify-center  xl:flex-row xl:justify-between  ">
        <div className="flex w-full justify-between">
          <img src={LOGO} alt="logo auto ximi" className=" h-auto w-40" />
          <div className="w-1/2 text-right">
            <p className="text-[16px] font-bold">{name}</p>
            <p className="text-[14px]">
              {address} {postalCode}
            </p>
            <p className="text-[14px]">
              {email}; {website};
            </p>
            <p className="text-[14px]">
              Broj tekućeg računa: {bankName}, {bankAccount} , {bankAccount2};
            </p>
            <p className="text-[14px]">Broj telefona: {phone};</p>
          </div>
        </div>
        {/* <div className="flex flex-wrap items-center justify-between gap-x-2">
          <button
            onClick={handlePrint}
            className="rounded border-2 border-gray-500 bg-gray-500 px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-gray-500"
          >
            Print
          </button>

          <button
            onClick={handlePrint}
            className="rounded border-2 border-blue-500 bg-blue-500 px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-blue-500"
          >
            Download
          </button>

          <button
            onClick={handlePrint}
            className="rounded border-2 border-green-500 bg-green-500 px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-green-500"
          >
            Send
          </button>
        </div> */}
      </header>
      <div className="my-6 h-2 w-full bg-red-700"></div>
    </>
  );
}
