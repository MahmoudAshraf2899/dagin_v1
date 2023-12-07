import "./StylesAr.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RightMenu from "./Components/RightMenu";
import Login from "./Components/Login.js";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      {token !== null ? (
        <>
          <RightMenu />
          <ToastContainer />
        </>
      ) : (
        <>
          <Login />
          <ToastContainer />
        </>
      )}

      {/*  */}
    </div>
  );
}

export default App;
