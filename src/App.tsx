import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/00.Main/Main";
import SignUp from "./pages/01.SignUp/SignUp";
import Withdrawal from "./pages/02.withdrawal/Withdrawal";
import Spp from "./pages/03.SPP/Spp";
import MyInfo from "./pages/04.MyInfo/MyInfo";
import SetLogin from "./pages/01.SignUp/SetLogin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="signup" element={<SignUp />} />
            <Route path="setLogin" element={<SetLogin />} />
            <Route path="withdrawal" element={<Withdrawal />} />
            <Route path="mySpp" element={<Spp />} />
            <Route path="myInfo" element={<MyInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
