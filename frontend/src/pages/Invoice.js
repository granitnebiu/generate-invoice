import dayjs from "dayjs/esm/index.js";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { AiOutlineDownload, AiOutlinePrinter } from "react-icons/ai";
import { BiLogOut, BiReset } from "react-icons/bi";

import { useState, useRef, useEffect } from "react";
import ClientDetails from "src/components/ClientDetails";
// import Date from "src/components/Date";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import MainDetails from "src/components/MainDetails";
import Notes from "src/components/Notes";
import Table from "src/components/Table";
import TableFrom from "src/components/TableFrom";
import ReactToPrint from "react-to-print";

import axios from "src/utils/axios";

export default function Invoice() {
  const rangeNumber = Math.floor(Math.random() * 9999) + 1000;
  const [showInvoice, setShowInvoice] = useState(false);
  const [active, setActive] = useState(false);
  const [name, setName] = useState(`"GEZIM MEMISHI PR AUTOLAKERSKA RADNJA LLAKER XIMI PREŠEVO"`);
  const [address, setAddress] = useState("Gnjilanska br.93");
  const [postalCode, setCityPostalCode] = useState("17523, Preševo , Srbija");
  const [email, setEmail] = useState("gezim.memishii@gmail.com");
  const [phone, setPhone] = useState("+381638605367");
  const [bankName, setBankName] = useState("NLB Komercijalna banka ad Beograd");
  const [bankAccount, setBankAccount] = useState("205-0000000219775-72");
  const [bankAccount2, setBankAccount2] = useState("205-0071000545931-76");
  const [website, setWebsite] = useState("www.ximiautocenter.me");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPib, setClientPib] = useState("");
  const [clientMb, setClientMb] = useState("");
  const [clientPlate, setClientPlate] = useState("");

  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [datumValute, setDatumValute] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [articleNumber, setArticleNumber] = useState("XM" + rangeNumber);
  const [jm, setJm] = useState("kom");
  const [rabat, setRabat] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  // const [priceTax, setPriceTax] = useState("");
  const [tax, setTax] = useState(20);
  const [amount, setAmount] = useState(0);
  const [priceSale, setPriceSale] = useState();
  const [list, setList] = useState("");
  const [total, setTotal] = useState(0);

  const componentRef = useRef();
  const pdfExportComponent = useRef(null);

  const handleExportWithMethod = (e) => {
    savePDF(componentRef.current, {
      scale: 0.7,
      paperSize: "A4",
      margin: 0.5,
      fileName: `Faktura za ${clientName} ${dayjs(new Date()).format("DD-MM-YYYY")}`,
    });
    // export with component
    // if (pdfExportComponent.current) {
    //   pdfExportComponent.current.save();
    // }
  };

  const [userData, setUserData] = useState();

  const userToken = {
    token: window.localStorage.getItem("token"),
  };

  useEffect(() => {
    axios
      .post("/userData", userToken)
      .then(function (response) {
        setUserData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // console.log(userData);
  //if there is no token redirect to login
  if (
    localStorage.getItem("token") === undefined ||
    localStorage.getItem("token") === "" ||
    localStorage.getItem("token") === null
  ) {
    return (
      <div className=" flex h-[500px] w-full items-center justify-center">
        <div className="arc"></div>
        <span className="hidden">{(window.location.href = "/sign-in")}</span>
      </div>
    );
  }

  //log out
  const logOut = (e) => {
    e.stopPropagation();
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/sign-in";
    window.localStorage.clear();
  };

  //handle forget password
  const handleReset = (e) => {
    e.stopPropagation();
    window.location.href = "/forgot-password";
  };

  if (userData === undefined) {
    return;
  }

  return (
    <>
      <div
        onClick={() => setActive(!active)}
        className="relative flex w-full select-none items-center justify-end space-x-2 px-8 pt-8"
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
            active ? "z-50 block " : "hidden"
          }   absolute  top-20 rounded-xl bg-white p-4`}
        >
          <button
            onClick={(e) => logOut(e)}
            className=" flex items-center space-x-2 text-[14px] hover:text-primary"
          >
            <BiLogOut />
            <span>Odjaviti se</span>
          </button>
          <button
            onClick={(e) => handleReset(e)}
            className=" flex items-center space-x-2 text-[14px] hover:text-primary"
          >
            <BiReset />
            <span>Zaboravili ste lozinku</span>
          </button>
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
            <div className="w-full overflow-x-auto ">
              <div
                className="paper-bg m-[30mm 45mm 30mm 45mm] mx-auto mt-4 h-[29.7cm] w-[21cm] border-2 bg-white p-5 shadow-xl"
                ref={componentRef}
              >
                <PDFExport scale={0.7} paperSize="A4" margin="0.5cm" ref={pdfExportComponent}>
                  <Header
                    name={name}
                    email={email}
                    address={address}
                    postalCode={postalCode}
                    phone={phone}
                    website={website}
                    bankName={bankName}
                    bankAccount={bankAccount}
                    bankAccount2={bankAccount2}
                  />
                  <div className="flex justify-between">
                    <MainDetails
                      name={name}
                      address={address}
                      email={email}
                      postalCode={postalCode}
                      phone={phone}
                      invoiceDate={invoiceDate}
                      datumValute={datumValute}
                    />
                    <ClientDetails
                      clientName={clientName}
                      clientMb={clientMb}
                      clientPib={clientPib}
                      clientAddress={clientAddress}
                      clientPlate={clientPlate}
                    />
                  </div>
                  {/* <Date invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} /> */}
                  <Table
                    articleNumber={articleNumber}
                    description={description}
                    quantity={quantity}
                    jm={jm}
                    price={price}
                    amount={amount}
                    list={list}
                    total={total}
                    setTotal={setTotal}
                  />
                  <Notes notes={notes} />
                  <Footer />
                </PDFExport>
              </div>
            </div>

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
            <p className="mb-4 font-medium text-gray-400 underline decoration-red-500/60">
              Podaci o kompaniji
            </p>
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
                  Svoje ime i prezime
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
                  Vaša adresa
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
                  Grad/poštanski broj
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
                  Vaš email
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
                  Vaš website
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
                  Vaš broj telefona
                </label>
              </div>
            </div>
            {/* bankName and bankAccount   */}
            <p className="mb-4 font-medium text-gray-400 underline decoration-red-500/60">
              Podaci o banci
            </p>
            <div className="mb-4 grid md:grid-cols-3 md:gap-6">
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
                  Naziv svoje banke
                </label>
              </div>
              {/* bankAccount   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
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
                  Tekući računi
                </label>
              </div>
              {/* bankAccount   */}
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="bankAccount2"
                  id="bankAccount2"
                  autoComplete="off"
                  value={bankAccount2}
                  onChange={(e) => setBankAccount2(e.target.value)}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                />
                <label
                  htmlFor="bankAccount2"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Tekući računi 2
                </label>
              </div>
            </div>{" "}
            <p className="mb-4 font-medium text-gray-400 underline decoration-red-500/60">
              Informacije o klijentima
            </p>
            {/* clientName and client address   */}
            <div className="mb-4 grid md:grid-cols-4 md:gap-6">
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
                  Ime vašeg klijenta
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
                  Adresa klijenta
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="clientPib"
                  id="clientPib"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  value={clientPib}
                  onChange={(e) => setClientPib(e.target.value)}
                />
                <label
                  htmlFor="clientPib"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  PIB Kliijenta
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="clientMb"
                  id="clientMb"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  value={clientMb}
                  onChange={(e) => setClientMb(e.target.value)}
                />
                <label
                  htmlFor="clientMb"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  MB Kliijenta
                </label>
              </div>
            </div>
            {/* invoiceNumber, invoiceDate, and DueDate    */}
            <div className="mb-4 grid md:grid-cols-3 md:gap-6">
              {/* invoiceNumber   */}
              {/* <div className="group relative z-0 mb-6 w-full">
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
                  Unesite broj svoje fakture
                </label>
              </div> */}
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
                  Datum izdavanja računa
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
                  Datum prometa dobara:
                </label>
              </div>
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="date"
                  name="datumValute"
                  id="datumValute"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  value={datumValute}
                  onChange={(e) => setDatumValute(e.target.value)}
                />
                <label
                  htmlFor="datumValute"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Datum valute:
                </label>
              </div>
            </div>
            <div className="mb-4 grid md:grid-cols-3 md:gap-6">
              <div className="group relative z-0 mb-6 w-full">
                <input
                  type="text"
                  name="clientPlate"
                  id="clientPlate"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-gray-100 py-2.5 px-0  pl-3 text-sm font-medium text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0  "
                  placeholder=" "
                  autoComplete="off"
                  value={clientPlate}
                  onChange={(e) => setClientPlate(e.target.value)}
                />
                <label
                  htmlFor="clientPlate"
                  className="absolute top-1 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-red-600  "
                >
                  Reg Oznaka
                </label>
              </div>
            </div>
            <p className="mb-8 font-medium text-gray-400 underline decoration-red-500/60">
              Tabela proizvoda
            </p>
            <TableFrom
              articleNumber={articleNumber}
              setArticleNumber={setArticleNumber}
              setDescription={setDescription}
              description={description}
              quantity={quantity}
              setQuantity={setQuantity}
              jm={jm}
              setJm={setJm}
              price={price}
              setPrice={setPrice}
              amount={amount}
              setAmount={setAmount}
              list={list}
              setList={setList}
              total={total}
              setTotal={setTotal}
              rangeNumber={rangeNumber}
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
                  Poruka za klijenta
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <button
                onClick={() => setShowInvoice(true)}
                className="rounded border-2 border-primary bg-primary px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-primary"
              >
                Pregled fakture
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
