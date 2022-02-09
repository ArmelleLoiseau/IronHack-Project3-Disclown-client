import "./App.css";
import Signup from "./components/connect/Signup";
import Login from "./components/connect/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      s{" "}
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
