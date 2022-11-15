import React, { useEffect } from "react";

export default function TableFrom({
  description,
  setDescription,
  quantity,
  setQuantity,
  amount,
  setAmount,
  price,
  setPrice,
}) {
  useEffect(() => {
    const calculateAmount = () => {
      setAmount(quantity * price);
    };
    calculateAmount(amount);
  }, [amount, quantity, price, setAmount]);

  return (
    <>
      <div className="my-4 grid md:grid-cols-4 md:gap-6">
        {/* description */}
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="description"
            id="description"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
            placeholder=" "
            autoComplete="off"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label
            htmlFor="description"
            className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
          >
            Description
          </label>
        </div>
        {/* quantity */}
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="number"
            name="quantity"
            id="quantity"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
            placeholder=" "
            autoComplete="off"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <label
            htmlFor="quantity"
            className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
          >
            Quantity
          </label>
        </div>
        {/* prise */}
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="number"
            name="prise"
            id="prise"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
            placeholder=" "
            autoComplete="off"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label
            htmlFor="prise"
            className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
          >
            Price
          </label>
        </div>
        {/* amount */}
        <div className="group relative z-0 mb-6 w-full">
          <p
            id="amount"
            className="disabled peer block w-full select-none appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
          >
            {amount}
          </p>
          <label
            htmlFor="prise"
            className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
          >
            Amount
          </label>
        </div>
      </div>
      <label htmlFor="">Item Description</label>
      <input type="text" name="description" id="description" placeholder="Item Description" />
    </>
  );
}
