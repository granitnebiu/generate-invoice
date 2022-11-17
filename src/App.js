import Login from "./pages/Login";
import Invoce from "./pages/Invoce";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const user = false;
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/invoice" /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/invoice" /> : <Login />} />
          <Route path="/invoice" element={<Invoce />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
