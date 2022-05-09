import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Booking = () => {
  const { userInfo } = useSelector((state) => state.userLoginReducer);

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=rooms");
    }
  }, [navigate, userInfo]);
  return <Navbar />;
};

export default Booking;
