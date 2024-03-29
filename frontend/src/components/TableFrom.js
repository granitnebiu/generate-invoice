import React, { useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
// import { BsCurrencyEuro } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";

export default function TableFrom({
  articleNumber,
  setArticleNumber,
  description,
  setDescription,
  quantity,
  setQuantity,
  jm,
  setJm,
  price,
  setPrice,
  amount,
  setAmount,
  setList,
  list,
  total,
  setTotal,
  rangeNumber,
}) {
  const [isEditing, setIsEditing] = useState(false);
  //create unique ID
  const unique_id = uuid();
  //submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error("Opis artikla, količina i cena su obavezni");
    } else {
      const newItems = {
        id: unique_id,
        description,
        articleNumber,
        quantity,
        jm,
        price,
        amount,
      };
      setDescription("");
      setQuantity(1);
      setPrice("");
      setAmount("");
      setArticleNumber("XM" + rangeNumber);
      setList([...list, newItems]);
      setIsEditing(false);
    }
  };
  //calculate Items amount
  useEffect(() => {
    setAmount(quantity * price);
  }, [quantity, price, setAmount, setArticleNumber, articleNumber]);

  //calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount");
    let sum = 0;

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseFloat(rows[i].innerHTML);
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
    setArticleNumber(editingRow.articleNumber);
    setDescription(editingRow.description);
    setJm(editingRow.jm);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
  };
  const number = total;
  const formattedTotal = number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <form className="" onSubmit={handleSubmit}>
        <div className=" grid md:grid-cols-4 md:gap-6">
          {/* article number */}
          <div className="group relative z-0 w-full">
            <input
              type="text"
              name="article_number"
              id="article_number"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
              placeholder=" "
              autoComplete="off"
              value={articleNumber}
              onChange={(e) => setArticleNumber(e.target.value)}
            />
            <label
              htmlFor="article_number"
              className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
            >
              Šifra artikla
            </label>
          </div>
          {/* description */}
          <div className="group relative z-0 w-full">
            <input
              type="text"
              name="description"
              id="description"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
              placeholder=" "
              autoComplete="off"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label
              htmlFor="description"
              className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
            >
              Naziv artikla
            </label>
          </div>
          {/* description */}
          <div className="group relative z-0 w-full">
            <input
              type="text"
              name="JM"
              id="JM"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
              placeholder=" "
              autoComplete="off"
              value={jm}
              onChange={(e) => setJm(e.target.value)}
            />
            <label
              htmlFor="JM"
              className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
            >
              JM
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
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label
              htmlFor="quantity"
              className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
            >
              Količina
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label
              htmlFor="prise"
              className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
            >
              Cena
            </label>
          </div>

          {/* amount */}
          <div className="group relative z-0 w-full">
            <p
              id="cena_sa_rabatom"
              className="disabled peer block w-full select-none appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
            >
              {amount}
            </p>
            <label
              htmlFor="cena_sa_rabatom"
              className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
            >
              Ukupno
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="my-4 rounded border-2 border-primary bg-primary px-4  py-1 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-primary"
        >
          {isEditing ? "Save Changes" : " Add New Item"}
        </button>
      </form>

      {/* table items  */}
      <table className="mt-5 mb-10 w-full">
        <thead>
          <tr className="border-b-2 border-b-gray-200 bg-gray-100 font-bold">
            <td className="border-r-2 border-b-gray-200">Šifra artikla</td>
            <td className="border-r-2 border-b-gray-200">Naziv artikla</td>
            <td className="border-r-2 border-b-gray-200">Količina</td>
            <td className="border-r-2 border-b-gray-200">JM</td>
            <td className="border-r-2 border-b-gray-200">Cena po komadu</td>
            <td className="border-r-2 border-b-gray-200">Ukupno</td>
          </tr>
        </thead>
        {list !== "" &&
          list.map(
            ({ id, articleNumber, description, quantity, jm, price, rabat, priceSale, amount }) => (
              <React.Fragment key={id}>
                <tbody className="">
                  <tr className="border-b-2 border-b-gray-200">
                    <td className="border-r-2 border-b-gray-200">{articleNumber}</td>
                    <td className="border-r-2 border-b-gray-200">{description}</td>
                    <td className="border-r-2 border-b-gray-200">{quantity}</td>
                    <td className="border-r-2 border-b-gray-200">{jm}</td>
                    <td className="border-r-2 border-b-gray-200">{price}</td>
                    <td className="amount">{amount}</td>
                    <td className="">
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
                </tbody>
              </React.Fragment>
            )
          )}
      </table>
      <div className="flex items-end justify-end text-base font-bold text-gray-800">
        <span className="pr-3 font-bold"> Ukupna cena: </span>
        <div className="flex items-center">
          <span>
            {formattedTotal}
            din
          </span>
        </div>
      </div>
    </>
  );
}
