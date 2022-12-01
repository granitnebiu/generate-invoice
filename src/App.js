import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Invoice from "./pages/Invoice";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sing-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
