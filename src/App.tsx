import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/00.Main/Main";
import SignUp from "./pages/01.SignUp/SignUp";
import Withdrawal from "./pages/02.withdrawal/Withdrawal";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="withdrawal" element={<Withdrawal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
