import React from "react";

export default function Date({ invoiceNumber, invoiceDate, dueDate }) {
  return (
    <>
      <article className="my-5 flex items-end justify-end">
        <ul className="">
          <li className="space-x-2 p-1">
            <span className="font-bold">Invoice Number:</span>
            <span>{invoiceNumber}</span>
          </li>
          <li className="space-x-2 bg-gray-100 p-1">
            <span className="font-bold">Invoice Date:</span>
            <span>{invoiceDate}</span>
          </li>
          <li className="space-x-2 p-1">
            <span className="font-bold">Due Date:</span>
            <span>{dueDate}</span>
          </li>
        </ul>
      </article>
    </>
  );
}
