import { useState } from "react";
import ClientDetails from "src/components/ClientDetails";
import Date from "src/components/Date";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import MainDetails from "src/components/MainDetails";
import Notes from "src/components/Notes";
import Table from "src/components/Table";

export default function App() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <main className="m-5 rounded bg-white p-5 shadow md:mx-auto md:max-w-xl lg:max-w-2xl xl:max-w-4xl">
        {showInvoice ? (
          <div>
            <Header handlePrint={handlePrint} />
            <MainDetails name={name} address={address} email={email} />
            <ClientDetails clientName={clientName} clientAddress={clientAddress} />
            <Date invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate} />
            <Table />
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
            <button
              onClick={() => setShowInvoice(false)}
              className="mt-5 rounded border-2 border-blue-500 bg-blue-500 px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-blue-500"
            >
              Edit Information
            </button>
          </div>
        ) : (
          <>
            {/* name, address, eemail, phone, bank name, bank account number, website client name, client address, invoice number, invoice date, due date, table, notes,  */}
            <div className="flex flex-col justify-center">
              <label htmlFor="name">Enter your name</label>
              <input
                type="text"
                name="text"
                id="name"
                placeholder="enter your name"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="address">Enter your address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="enter your address"
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <label htmlFor="email">Enter your email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="enter your email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="website">Enter your website</label>
              <input
                type="url"
                name="website"
                id="website"
                placeholder="enter your website"
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <label htmlFor="phone">Enter your phone</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                placeholder="enter your phone"
                autoComplete="off"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <label htmlFor="bankName">Enter your Bank Name</label>
              <input
                type="text"
                name="bankName"
                id="bankName"
                placeholder="enter your Bank Name"
                autoComplete="off"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />

              <label htmlFor="bankAccount">Enter your Bank Account Number</label>
              <input
                type="number"
                name="bankAccount"
                id="bankAccount"
                placeholder="enter your Bank Name Number"
                autoComplete="off"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
              />
              <label htmlFor="clientName">Enter your Client's Name</label>
              <input
                type="text"
                name="clientName"
                id="clientName"
                placeholder="enter your Client's Name"
                autoComplete="off"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <label htmlFor="clientAddress">Enter your Client's Address</label>
              <input
                type="text"
                name="clientAddress"
                id="clientAddress"
                placeholder="enter yourClient's Address"
                autoComplete="off"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
              <label htmlFor="invoiceNumber">Enter your Invoice Number</label>
              <input
                type="text"
                name="invoiceNumber"
                id="invoiceNumber"
                placeholder="enter your Invoice Number"
                autoComplete="off"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <label htmlFor="invoiceDate">Enter your Invoice Date</label>
              <input
                type="date"
                name="invoiceDate"
                id="invoiceDate"
                placeholder="enter your Invoice Date"
                autoComplete="off"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
              <label htmlFor="dueDate">Enter your Due Date</label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                placeholder="enter your Due Date"
                autoComplete="off"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <label htmlFor="notes">Enter your Notes</label>
              <textarea
                name="notes"
                cols="30"
                rows="10"
                id="notes"
                placeholder="Additional notes to the client"
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>

              <button
                onClick={() => setShowInvoice(true)}
                className="rounded border-2 border-blue-500 bg-blue-500 px-8  py-2 font-bold text-white shadow transition-all duration-500 hover:bg-transparent hover:text-blue-500"
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
