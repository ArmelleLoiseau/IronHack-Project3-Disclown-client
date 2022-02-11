import "./App.css";
import Signup from "./components/connect/Signup";
import Login from "./components/connect/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/protectedRoutes/PrivateRoute";
import NotFound from "./components/NotFound";
import Channel from "./components/channels/Channel";
import VideoPage from "./components/video/VideoPage";

function App() {
  return (
    <div className="App">
      <div className="headerApp">
        <span>Disclown</span>
      </div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chan/:id" element={<Channel />} />
        </Route>
        <Route path="/video" element={<VideoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
