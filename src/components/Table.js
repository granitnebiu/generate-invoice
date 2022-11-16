import React from "react";
import { BsCurrencyEuro } from "react-icons/bs";

export default function Table({ list, total, setTotal }) {
  return (
    <>
      <table className="my-5 mb-10 w-full">
        <thead>
          <tr className="bg-gray-100 font-bold">
            <td>Item Description</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Amount</td>
          </tr>
        </thead>
        {list !== "" &&
          list.map(({ id, description, quantity, price, amount }) => (
            <React.Fragment key={id}>
              <thead className="">
                <tr>
                  <td>{description}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                  <td>{amount}</td>
                </tr>
              </thead>
            </React.Fragment>
          ))}
      </table>
      <div className="flex items-end justify-end pb-5 text-3xl font-bold text-gray-800">
        <span className="pr-3 text-xl font-normal"> Total: </span>
        <div className="flex items-center">
          <span> {total.toLocaleString()}</span>
          <BsCurrencyEuro className="h-6 w-6" />
        </div>
      </div>
    </>
  );
}
