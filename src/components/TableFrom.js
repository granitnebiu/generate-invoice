import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { BsCurrencyEuro } from "react-icons/bs";
import { v4 as uuid } from "uuid";

export default function TableFrom({
  description,
  setDescription,
  quantity,
  setQuantity,
  amount,
  setAmount,
  price,
  setPrice,
  setList,
  list,
  total,
  setTotal,
}) {
  const [isEditing, setIsEditing] = useState(false);
  //create unique ID
  const unique_id = uuid();
  //submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      id: unique_id,
      description,
      quantity,
      price,
      amount,
    };
    setDescription("");
    setQuantity("");
    setPrice("");
    setAmount("");
    setList([...list, newItems]);
    setIsEditing(false);
  };
  //calculate Items amount
  useEffect(() => {
    setAmount(quantity * price);
  }, [quantity, price, setAmount]);

  //calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
        setTotal(sum);
      }
    }
  });

  //delete function
  const deleteTableRow = (id) => {
    // console.log(id);
    // console.log(list.filter((row) => console.log(row.id !== id)));
    setList(list.filter((row) => row.id !== id));
  };
  // edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className=" grid md:grid-cols-4 md:gap-6">
          {/* description */}
          <div className="group relative z-0 w-full">
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
              Item Description
            </label>
          </div>
          {/* quantity */}
          <div className="group relative z-0 w-full">
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
          <div className="group relative z-0  w-full">
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
          <div className="group relative z-0 w-full">
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

        <button
          type="submit"
          className="my-4 rounded border-2 border-red-500 bg-red-500 px-4  py-1 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-red-500"
        >
          {isEditing ? "Save Changes" : " Add New Item"}
        </button>
      </form>

      {/* table items  */}
      <table className="mt-5 mb-10 w-full">
        <thead>
          <tr className="bg-gray-100 font-bold">
            <td>Item Description</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Amount</td>
          </tr>
        </thead>
        {list !== "" &&
          list.map(({ id, description, quantity, price, amount }) => (
            <React.Fragment key={id}>
              <thead className="">
                <tr>
                  <td>{description}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                  <td className="amount">{amount}</td>
                  <td>
                    <button onClick={() => deleteTableRow(id)}>
                      <BsTrash className="text-red-700" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => editRow(id)}>
                      <FiEdit className="text-green-700" />
                    </button>
                  </td>
                </tr>
              </thead>
            </React.Fragment>
          ))}
      </table>
      <div className="flex items-end justify-end pb-5 text-3xl font-bold text-gray-800">
        <span className="pr-3 text-xl font-normal"> Total: </span>
        <div className="flex items-center">
          <span> {total.toLocaleString()}</span>
          <BsCurrencyEuro className="h-6 w-6" />
        </div>
      </div>
    </>
  );
}
