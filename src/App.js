import Login from "./pages/Login";
import Invoice from "./pages/Invoice";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  const user = false;
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/invoice" /> : <Login />} />
          <Route path="/sign-in" element={user ? <Navigate to="/invoice" /> : <Login />} />
          <Route path="/invoice" element={user ? <Invoice /> : <Navigate to="/sign-in" />} />
          <Route path="/sing-up" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
