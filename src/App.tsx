import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/00.Main/Main";
import SignUp from "./pages/01.SignUp/SignUp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
