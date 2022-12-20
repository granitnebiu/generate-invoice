import React from "react";
// import { BsCurrencyEuro } from "react-icons/bs";

export default function Table({ tax, list, total, setTotal }) {
  return (
    <>
      <table className="my-5 mb-10 w-full">
        <thead>
          <tr className="bg-gray-100 font-bold">
            <td className="border-r-2 border-b-gray-200">Šifra artikla</td>
            <td className="border-r-2 border-b-gray-200">Naziv artikla</td>
            <td className="border-r-2 border-b-gray-200">Količina</td>
            <td className="border-r-2 border-b-gray-200">JM</td>
            <td className="border-r-2 border-b-gray-200">Cena</td>
            <td className="border-r-2 border-b-gray-200">Ukupno</td>
          </tr>
        </thead>
        {list !== "" &&
          list.map(({ id, articleNumber, description, quantity, jm, price, amount }) => (
            <React.Fragment key={id}>
              <thead className="">
                <tr className="border-2 border-b-gray-200 text-center">
                  <td className="border-r-2 border-b-gray-200">{articleNumber}</td>
                  <td className="border-r-2 border-b-gray-200">{description}</td>
                  <td className="border-r-2 border-b-gray-200">{quantity}</td>
                  <td className="border-r-2 border-b-gray-200">{jm}</td>
                  <td className="border-r-2 border-b-gray-200">{price}</td>
                  <td className="border-r-2 border-b-gray-200">{amount}</td>
                </tr>
              </thead>
            </React.Fragment>
          ))}
      </table>
      <div className="flex items-end justify-end text-base font-bold text-gray-800">
        <span className="pr-3 font-bold"> Ukupna cena: </span>
        <div className="flex items-center">
          <span>
            {total.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            din
          </span>
        </div>
      </div>
    </>
  );
}
