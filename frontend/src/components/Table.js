import React from "react";
// import { BsCurrencyEuro } from "react-icons/bs";

export default function Table({ tax, list, total, setTotal }) {
  return (
    <>
      <table className="my-5 mb-10 w-full">
        <thead>
          <tr className="bg-gray-100 font-bold">
            <td>Šifra artikla</td>
            <td>Naziv artikla</td>
            <td>Količina</td>
            <td>JM</td>
            <td>Cena</td>
            <td>Rabat</td>
            <td>Cena sa rabatom</td>
            <td>PDV(%)</td>
            <td>Iznos sa PDV-a</td>
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
                  <tr className="border-2 border-b-gray-200">
                    <td>{articleNumber}</td>
                    <td>{description}</td>
                    <td>{quantity}</td>
                    <td>{jm}</td>
                    <td>{price}</td>
                    <td>{rabat}</td>
                    <td>{priceSale}</td>
                    <td>{tax}</td>
                    <td>{priceSale}</td>
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
