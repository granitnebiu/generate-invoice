import React from "react";

export default function Footer() {
  return (
    <>
      <div className="flex justify-between">
        <div className="w-96">
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
    </>
  );
}
