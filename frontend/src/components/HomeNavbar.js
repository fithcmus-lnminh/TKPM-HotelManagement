import React, { useEffect, useState } from "react";
import { Button, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  const [color, setColor] = useState({
    bg: "bg-transparent",
    text: "text-gray",
  });

  const listenScrollEvent = (e) => {
    if (window.scrollY > 200) {
      setColor({ bg: "bg-dark", text: "text-white" });
    } else {
      setColor({ bg: "bg-transparent", text: "text-gray" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <div className={`px-5 py-3 position-fixed w-100 ${color.bg}`}>
      <nav className="d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-4">
          <Link
            to="/"
            className={
              color.text === "text-gray"
                ? "text-white logo"
                : `${color.text} logo`
            }
          >
            TKPM HOTEL
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <div>
            <Link to="/" className={`px-3 ${color.text}`}>
              Trang chủ
            </Link>
            <Link to="/rooms" className={`px-3 ${color.text}`}>
              Xem phòng
            </Link>
            <Link to="/room-booking" className={`px-3 ${color.text}`}>
              Đặt phòng
            </Link>
            <Link to="/contact" className={`px-3 ${color.text}`}>
              Liên hệ
            </Link>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Link to="/login" className={`px-3 ${color.text}`}>
            Đăng nhập
          </Link>
          <div className="w-0.5 h-6 bg-gray-300 opacity-50"></div>
          <Button variant="primary">
            <Link to="/register" className="text-white">
              Đăng ký
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default HomeNavbar;
