import React from "react";

export default function Header({ handlePrint }) {
  return (
    <>
      <header className="mb-5 flex flex-col items-center justify-center  xl:flex-row xl:justify-between  ">
        <div>
          <h1 className="mb-3 text-4xl font-bold uppercase tracking-wide">Invoice</h1>
        </div>
        <div>
          <ul className="flex flex-wrap items-center justify-between">
            <li>
              <button onClick={handlePrint} className="btn btn-print">
                Print
              </button>
            </li>
            <li>
              <button onClick={handlePrint} className="btn btn-download">
                Download
              </button>
            </li>
            <li>
              <button onClick={handlePrint} className="btn btn-send">
                Send
              </button>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
