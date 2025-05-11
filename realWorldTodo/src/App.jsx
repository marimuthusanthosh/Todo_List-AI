import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Router from "./components/router";
import { RecoilRoot } from "recoil";
import AI from "./components/AI";


function App() {
  return (
    <div>
      <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/route" element={<Router />} />
        <Route path="/ai" element={<AI/>}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </div>
  );
}

export default App;
