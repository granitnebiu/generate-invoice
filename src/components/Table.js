import React from "react";

export default function Table({ description, quantity, price, amount }) {
  return (
    <>
      <table className="my-5 w-full">
        <thead>
          <tr className="bg-gray-100 font-bold">
            <td>Item Description</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Amount</td>
          </tr>
        </thead>

        <thead className="">
          <tr>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{amount}</td>
          </tr>
        </thead>
      </table>
    </>
  );
}
