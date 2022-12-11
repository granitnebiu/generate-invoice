import React from "react";

export default function ClientDetails({
  clientName,
  clientAddress,
  clientPib,
  clientMb,
  clientPlate,
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
            Tablica automobila: <span className="font-bold">{clientPlate}</span>
          </p>
        )}
      </section>
    </>
  );
}
