import React from "react";

export default function Date() {
  return (
    <>
      <article className="my-5 flex items-end justify-end">
        <ul className="">
          <li className="space-x-2">
            <span className="font-bold">Invoice Number:</span>
            <span>Invoice Number</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Invoice Date:</span>
            <span>Invoice Date</span>
          </li>
          <li className="space-x-2">
            <span className="font-bold">Due Date:</span>
            <span>11.03.1994</span>
          </li>
        </ul>
      </article>
    </>
  );
}
