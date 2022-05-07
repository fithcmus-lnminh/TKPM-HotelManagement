import React from "react";
import "antd/dist/antd.min.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Report from "./pages/Admin & Manager/Report";
import RoomManagement from "./pages/Admin & Manager/RoomManagement";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import AccountManagement from "./pages/Admin/accountManagement";
import { addNavigate } from "./redux/actions/sysAction";
import UserProfile from "./pages/UserProfile";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addNavigate(navigate));
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room-booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/room-management" element={<RoomManagement />} />
      <Route path="/report" element={<Report />} />
      <Route path="/admin/account-management" element={<AccountManagement />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

export default App;
