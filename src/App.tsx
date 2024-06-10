import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./pages/00.Main/Main";
import SingUp from "./pages/01.SignUp/SingUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="signup" element={<SingUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
