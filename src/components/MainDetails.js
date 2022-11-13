import React from "react";

export default function MainDetails({ name, address }) {
  return (
    <>
      <section className="flex flex-col items-end justify-end">
        {/* <input type="text" name="text" id="text" placeholder="enter your name" required /> */}
        <h2 className="text-xl font-bold uppercase md:text-4xl">{name}</h2>
        <p>{address}</p>
      </section>
    </>
  );
}
