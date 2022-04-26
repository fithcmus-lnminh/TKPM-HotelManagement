import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rooms from "./pages/Rooms";
import { addNavigate } from "./redux/actions/sysAction";

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
    </Routes>
  );
};

export default App;
