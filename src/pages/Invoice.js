import { useState, useRef, useEffect } from "react";
import ClientDetails from "src/components/ClientDetails";
import Date from "src/components/Date";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import MainDetails from "src/components/MainDetails";
import Notes from "src/components/Notes";
import Table from "src/components/Table";
import TableFrom from "src/components/TableFrom";
import ReactToPrint from "react-to-print";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { AiOutlineDownload, AiOutlinePrinter } from "react-icons/ai";
import { BiLogOut, BiReset } from "react-icons/bi";

import axios from "axios";

export default function Invoice() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [active, setActive] = useState(false);
  const [name, setName] = useState("Auto Llaker 'Ximi'");
  const [address, setAddress] = useState("Rruga e Gjilanit 93");
  const [postalCode, setCityPostalCode] = useState("Presevë, Serbia, 17523");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+381638605367");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState("");
  const [total, setTotal] = useState(0);

  const componentRef = useRef();
  const pdfExportComponent = useRef(null);

  const handleExportWithMethod = (e) => {
    savePDF(componentRef.current, { paper: "A4" });
  };

  const [userData, setUserData] = useState();

  const userToken = {
    token: window.localStorage.getItem("token"),
  };
  useEffect(() => {
    axios
      .post("http://localhost:5000/userData", userToken, {
        crossDomain: true,
        headers: {
          Accept: "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then(function (response) {
        setUserData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (userData === undefined) {
    return;
  }

  // console.log(userData);

  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className=" relative flex w-full select-none items-center justify-end space-x-2 px-8 pt-8"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <p className="font-bold uppercase text-white">{userData.firstName.charAt(0)}</p>
        </div>
        <div className="leading-0">
          <p className="text-[14px] font-bold capitalize text-primary">
            {userData.firstName} {userData.lastName}
          </p>
          <p className="text-[10px] font-medium text-gray-500">{userData.email}</p>
        </div>

        <div
          className={`${
            active ? "hidden" : "z-50 block"
          } absolute  top-20  rounded-xl bg-white p-4 `}
        >
          <p className=" flex items-center space-x-2 text-[14px] hover:text-primary">
            <BiLogOut />
            <span>Log out</span>
          </p>
          <p className=" flex items-center space-x-2 text-[14px] hover:text-primary">
            <BiReset />
            <span>Reset Password</span>
          </p>
        </div>
      </div>

      <main className="m-5 rounded bg-white p-5 shadow md:mx-auto md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {showInvoice ? (
          <>
            <div className="flex gap-2">
              <ReactToPrint
                trigger={() => (
                  <button className="rounded border-2 border-gray-500 bg-gray-500 px-2  py-1 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-gray-500">
                    <AiOutlinePrinter />
                  </button>
                )}
                content={() => componentRef.current}
              />

              <button
                onClick={handleExportWithMethod}
                className="rounded border-2 border-gray-500 bg-gray-500 px-2  py-1 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-gray-500"
              >
                <AiOutlineDownload />
              </button>
            </div>
            <PDFExport ref={pdfExportComponent} pageSize="A4">
              <div
                className="paper-bg m-[30mm 45mm 30mm 45mm] h-[29.7cm] w-[21cm] p-5"
                ref={componentRef}
              >
                <Header />
                <MainDetails
                  name={name}
                  address={address}
                  email={email}
                  postalCode={postalCode}
                  phone={phone}
                />
                <ClientDetails clientName={clientName} clientAddress={clientAddress} />
                <Date invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} />
                <Table
                  description={description}
                  amount={amount}
                  price={price}
                  quantity={quantity}
                  list={list}
                  total={total}
                  setTotal={setTotal}
                />
                <Notes notes={notes} />
                <Footer
                  name={name}
                  address={address}
                  email={email}
                  website={website}
                  phone={phone}
                  bankName={bankName}
                  bankAccount={bankAccount}
                />
              </div>
            </PDFExport>
            <button
              onClick={() => setShowInvoice(false)}
              className="mt-5 rounded border-2 border-blue-500 bg-blue-500 px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-blue-500"
            >
              Edit Information
            </button>
          </>
        ) : (
          <>
            {/* name and address, street */}
            <div className="my-4 grid md:grid-cols-3 md:gap-6">
              {/* name */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="name"
                  id="name"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your name
                </label>
              </div>
              {/* address */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  required
                  value={address}
                  autoComplete="off"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label
                  htmlFor="address"
                  className=" absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform pl-3 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your address
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="cityPostalCode"
                  id="cityPostalCode"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  required
                  value={postalCode}
                  autoComplete="off"
                  onChange={(e) => setCityPostalCode(address.target.value)}
                />
                <label
                  htmlFor="cityPostalCode"
                  className=" absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform pl-3 text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  City/PostalCode
                </label>
              </div>
            </div>
            {/* email, website and phone */}

            <div className="mb-4 grid md:grid-cols-3 md:gap-6">
              {/* email  */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  required
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label
                  htmlFor="email"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your email
                </label>
              </div>
              {/* website   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="url"
                  name="website"
                  id="website"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  required
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <label
                  htmlFor="website"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your website
                </label>
              </div>
              {/* phone   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  autoComplete="off"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your phone
                </label>
              </div>
            </div>
            {/* bankName and bankAccount   */}
            <div className="mb-4 grid md:grid-cols-2 md:gap-6">
              {/* bankName   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="bankName"
                  id="bankName"
                  autoComplete="off"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                />
                <label
                  htmlFor="bankName"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your Bank Name
                </label>
              </div>
              {/* bankAccount   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="number"
                  name="bankAccount"
                  id="bankAccount"
                  autoComplete="off"
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                />
                <label
                  htmlFor="bankAccount"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your Bank Account Number
                </label>
              </div>
            </div>

            {/* clientName and client address   */}
            <div className="mb-4 grid md:grid-cols-2 md:gap-6">
              {/* clientName   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="clientName"
                  id="clientName"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                <label
                  htmlFor="clientName"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your Client's Name
                </label>
              </div>
              {/* clientAddress   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="clientAddress"
                  id="clientAddress"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  required
                />
                <label
                  htmlFor="clientAddress"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your Client's Address
                </label>
              </div>
            </div>
            {/* invoiceNumber, invoiceDate, and DueDate    */}
            <div className="mb-4 grid md:grid-cols-3 md:gap-6">
              {/* invoiceNumber   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="invoiceNumber"
                  id="invoiceNumber"
                  placeholder=" "
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  autoComplete="off"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
                <label
                  htmlFor="invoiceNumber"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your Invoice Number
                </label>
              </div>
              {/* invoiceDate   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="date"
                  name="invoiceDate"
                  id="invoiceDate"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
                <label
                  htmlFor="invoiceDate"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your Invoice Date
                </label>
              </div>
              {/* Due date  */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <label
                  htmlFor="dueDate"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Enter your Due Date
                </label>
              </div>
            </div>
            <TableFrom
              setDescription={setDescription}
              description={description}
              setAmount={setAmount}
              amount={amount}
              setPrice={setPrice}
              price={price}
              setQuantity={setQuantity}
              quantity={quantity}
              list={list}
              setList={setList}
              total={total}
              setTotal={setTotal}
            />

            {/* client notes  */}
            <div className="mb-4 grid md:grid-cols-1 md:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <textarea
                  name="notes"
                  cols="30"
                  rows="10"
                  id="notes"
                  autoComplete="off"
                  placeholder=" "
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0 pl-3 text-sm font-bold text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                ></textarea>
                <label
                  htmlFor="notes"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Notes for Client
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setShowInvoice(true)}
                className="rounded border-2 border-primary bg-primary px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-primary"
              >
                Preview Invoice
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
