import React from "react";

export default function MainDetails({ name, address, postalCode, phone }) {
  return (
    <>
      <section className="flex flex-col items-end justify-end">
        {/* <input type="text" name="text" id="text" placeholder="enter your name" required /> */}
        <h2 className="text-xl font-bold uppercase md:text-2xl">{name}</h2>
        <p className="text-xl">{address}</p>
        <p className="text-xl">{postalCode}</p>
        <p className="text-xl">{phone}</p>

      </section>
    </>
  );
}
