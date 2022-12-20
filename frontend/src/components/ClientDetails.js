import React from "react";

export default function ClientDetails({
  clientName,
  clientAddress,
  clientPib,
  clientMb,
  clientPlate,
  clientBrojStete,
  clientPolicaBroj,
}) {
  return (
    <>
      <section className="w-1/2 border-2 text-center">
        <p className="font-bold">KUPAC</p>
        <p className="">{clientName}</p>

        <p>PIB: {clientPib}</p>
        <p>MB: {clientMb}</p>
        <p className="mt-4">{clientAddress}</p>
        {clientPlate !== "" && (
          <p>
            Reg Oznaka: <span className="font-bold">{clientPlate}</span>
          </p>
        )}
        {clientBrojStete !== "" && (
          <p>
            Broj štete: <span className="font-bold">{clientBrojStete}</span>
          </p>
        )}
        {clientPolicaBroj !== "" && (
          <p>
            Polisa broj: <span className="font-bold">{clientPolicaBroj}</span>
          </p>
        )}
      </section>
    </>
  );
}
