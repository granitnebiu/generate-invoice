import Login from "./pages/Login";
import Invoice from "./pages/Invoice";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sing-up" element={<SignUp />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
