import NavBar from "./pages/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";
import Register from "./components/Register";
import { Provider } from "./context";
import Home from "./components/Home";
import ResetPassword from "./components/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseDashboard from "./components/dashboard/CourseDashboard";
import Lessons from "./components/courses/Lessons";

const App = () => {
  return (
    <BrowserRouter>
      <Provider>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<CourseDashboard />} />
          <Route path="/login/reset" element={<ResetPassword />} />
          <Route path="/lessons/:id" element={<Lessons />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Provider>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
