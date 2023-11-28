import "./StylesAr.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RightMenu from "./Components/RightMenu";
import Login from "./Components/Login.js";

function App() {
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      {token !== null ? (
        <>
          <RightMenu />
        </>
      ) : (
        <>
          <Login />
        </>
      )}

      {/*  */}
    </div>
  );
}

export default App;
