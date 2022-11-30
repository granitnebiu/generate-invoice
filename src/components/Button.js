import React from "react";

export default function Button({ onClick, btnName, btnType, extraClass = "" }) {
  return (
    <button
      type={btnType}
      onClick={onClick}
      className={`${extraClass} rounded border-2 border-primary bg-primary px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-primary
    `}
    >
      {btnName}
    </button>
  );
}
