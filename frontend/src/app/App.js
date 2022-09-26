import { BrowserRouter, Route, Routes } from "react-router-dom";
import MiniDrawer from "../components/SideBar";
import Login from "../pages/Account/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/index.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/booking/*" element={<><MiniDrawer/></>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
