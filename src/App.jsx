import "./App.css";
import Signup from "./components/connect/Signup";
import Login from "./components/connect/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <h1> HELLO </h1>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
