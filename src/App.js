import ClientDetails from "src/components/ClientDetails";
import Date from "src/components/Date";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import MainDetails from "src/components/MainDetails";
import Notes from "src/components/Notes";
import Table from "src/components/Table";

export default function App() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <main className="m-5 rounded bg-white p-5 shadow xl:mx-auto xl:max-w-4xl">
        <Header handlePrint={handlePrint} />
        <MainDetails />
        <ClientDetails />
        <Date />
        <Table />
        <Notes />
        <Footer />
      </main>
    </>
  );
}
