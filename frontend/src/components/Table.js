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
            <td className="border-r-2 border-b-gray-200">Rabat</td>
            <td className="border-r-2 border-b-gray-200">Cena sa rabatom</td>
            <td className="border-r-2 border-b-gray-200">PDV(%)</td>
            <td className="border-r-2 border-b-gray-200">Iznos bez PDV-a</td>
          </tr>
        </thead>
        {list !== "" &&
          list.map(
            ({
              id,
              articleNumber,
              description,
              quantity,
              jm,
              price,
              rabat,
              priceSale,
              tax,
              amount,
            }) => (
              <React.Fragment key={id}>
                <thead className="">
                  <tr className="border-2 border-b-gray-200 text-center">
                    <td className="border-r-2 border-b-gray-200">{articleNumber}</td>
                    <td className="border-r-2 border-b-gray-200">{description}</td>
                    <td className="border-r-2 border-b-gray-200">{quantity}</td>
                    <td className="border-r-2 border-b-gray-200">{jm}</td>
                    <td className="border-r-2 border-b-gray-200">{price}</td>
                    <td className="border-r-2 border-b-gray-200">{rabat}</td>
                    <td className="border-r-2 border-b-gray-200">{priceSale}</td>
                    <td className="border-r-2 border-b-gray-200">{tax}</td>
                    <td className="border-r-2 border-b-gray-200">{priceSale}</td>
                  </tr>
                </thead>
              </React.Fragment>
            )
          )}
      </table>
      <div className="flex items-end justify-end text-base font-bold text-gray-800">
        <span className="pr-3 font-bold"> Ukupno: </span>
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
      <div className="flex items-end justify-end text-base text-gray-800">
        <span className="pr-3  font-normal">
          PDV 20% Osnovica:
          {total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
        <div className="flex items-center">
          <span>
            {(total - total * (1 - tax / 100)).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            din
          </span>
        </div>
      </div>
      <div className="flex items-end justify-end pb-5 text-base font-bold text-gray-800">
        <span className="font-me pr-3"> Ukupno sa PDV: </span>
        <div className="flex items-center font-normal">
          <span>
            {(total + (total - total * (1 - tax / 100))).toLocaleString(undefined, {
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
