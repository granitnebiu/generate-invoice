export default function App() {
  const handlePrint = () => {};
  return (
    <>
      <main className="m-5 rounded bg-white p-5 shadow xl:mx-auto xl:max-w-4xl">
        <header className="mb-5 flex flex-col items-center justify-center  xl:flex-row xl:justify-between  ">
          <div>
            <h1 className="mb-3 text-4xl font-bold uppercase tracking-wide">Invoice</h1>
          </div>
          <div>
            <ul className="flex flex-wrap items-center justify-between">
              <li>
                <button onClick={handlePrint} className="btn btn-print">
                  Print
                </button>
              </li>
              <li>
                <button onClick={handlePrint} className="btn btn-download">
                  Print
                </button>
                Download
              </li>
              <li>
                <button onClick={handlePrint} className="btn btn-send">
                  Send
                </button>
              </li>
            </ul>
          </div>
        </header>
        <section className="flex flex-col items-end justify-end">
          {/* <input type="text" name="text" id="text" placeholder="enter your name" required /> */}
          <h2 className="text-xl uppercase">Auto "Ximi"</h2>
          <p>Your address</p>
        </section>
        {/* client details  */}
        <section className="mt-5">
          {/* <input type="text" name="text" id="text" placeholder="enter your name" required /> */}
          <h2 className="text-xl uppercase">Client's Name</h2>
          <p>Client's address</p>
        </section>
        {/* dates */}
        <article className="my-5 flex items-end justify-end">
          <ul className="">
            <li className="space-x-2">
              <span className="font-bold">Invoice Number:</span>
              <span>Invoice Number</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Invoice Date:</span>
              <span>Invoice Date</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Due Date:</span>
              <span>11.03.1994</span>
            </li>
          </ul>
        </article>
        {/* table */}
        <div className="my-5">This is the table</div>
        {/* notes */}
        <section className="mb-5">
          <p>Notes to the client ...</p>
        </section>
        <footer>
          <ul className="flex flex-wrap items-center justify-center space-x-2">
            <li className="space-x-1">
              <span className="font-bold">Your Name:</span>
              <span>Auto "ximi"</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Your Email:</span>
              <span>autoximi@gmail.com</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Bank:</span>
              <span>Bank Account</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Account holder:</span>
              <span>175464651000548</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Account number:</span>
              <span>175464651000548</span>
            </li>
            <li className="space-x-2">
              <span className="font-bold">Website:</span>
              <span>https://www.autoximi.com</span>
            </li>
          </ul>
        </footer>
      </main>
    </>
  );
}
