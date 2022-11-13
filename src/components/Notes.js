import React from "react";

export default function Notes({ notes }) {
  return (
    <>
      <section className="mb-5">
        <p className="text-justify lg:w-1/2">{notes}</p>
      </section>
    </>
  );
}
