import React from "react";
import dayjs from "dayjs/esm/index.js";

export default function MainDetails({ invoiceDate, dueDate, postalCode, datumValute }) {
  const rangeNumber = Math.floor(Math.random() * 20) + 1;
  const uniqueID = "XIMI" + Math.random().toString(36).slice(2, 7) + 211 + "-0" + rangeNumber;
  const partAddress = postalCode.split(" ");
  return (
    <>
      <section className="flex flex-col text-left">
        {/* <input type="text" name="text" id="text" placeholder="Unesite svoje ime" required /> */}
        <p className="font-bold">
          Račun otpremnica robe: <span className="uppercase"> {uniqueID}</span>
        </p>
        <p className="">
          Datum izdavanja računa :
          <span className="uppercase"> {dayjs(invoiceDate).format("DD.MM.YYYY")}</span>
        </p>
        <p className="">
          Mesto izadanja računa:
          <span className=""> {partAddress[1] + " " + partAddress[2]}</span>
        </p>
        <p className="">
          Datum izdavanja računa :
          <span className="uppercase"> {dayjs(dueDate).format("DD.MM.YYYY")}</span>
        </p>
        <p className="">
          Datum valute :
          <span className="uppercase"> {dayjs(datumValute).format("DD.MM.YYYY")}</span>
        </p>
      </section>
    </>
  );
}
