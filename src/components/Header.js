import React from "react";

export default function Header({ handlePrint }) {
  return (
    <>
      <header className="mb-5 flex flex-col items-center justify-center  xl:flex-row xl:justify-between  ">
        <div>
          <h1 className="mb-3 text-4xl font-bold uppercase tracking-wide">Invoice</h1>
        </div>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-x-2">
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
          </div>
        </div>
      </header>
    </>
  );
}
