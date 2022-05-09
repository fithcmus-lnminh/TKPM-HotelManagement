import React, { useEffect, useState } from "react";
import { Button, Image, Modal, NavDropdown, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/userAction";

const HomeNavbar = () => {
  const [color, setColor] = useState({
    bg: "bg-transparent",
    text: "text-gray",
  });

  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const dispatch = useDispatch();

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

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className={`px-5 py-2 position-fixed w-100 ${color.bg}`}>
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
            {userInfo?.role === "Admin" ? (
              <>
                <Link to="/room-management" className={`px-3 ${color.text}`}>
                  Quản lý phòng
                </Link>
                <Link
                  to="/admin/account-management"
                  className={`px-3 ${color.text}`}
                >
                  Quản lý tài khoản
                </Link>
                <Link to="/report" className={`px-3 ${color.text}`}>
                  Xem báo cáo
                </Link>
              </>
            ) : userInfo?.role === "Manager" ? (
              <>
                <Link to="/room-management" className={`px-3 ${color.text}`}>
                  Quản lý phòng
                </Link>
                <Link to="/report" className={`px-3 ${color.text}`}>
                  Xem báo cáo
                </Link>
              </>
            ) : (
              <>
                <Link to="/contact" className={`px-3 ${color.text}`}>
                  Liên hệ
                </Link>
              </>
            )}
          </div>
        </div>
        {userInfo ? (
          <div className="d-flex align-items-center justify-content-end">
            <NavDropdown title={`Xin chào, ${userInfo.name}`} className="me-2">
              <Link to="/profile">
                <NavDropdown.Item as="div">
                  <i className="fas fa-user me-2"></i>Hồ sơ cá nhân
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Item onClick={logoutHandler}>
                <i className="fas fa-arrow-right-from-bracket me-2"></i>
                Đăng xuất
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        ) : (
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
        )}
      </nav>
    </div>
  );
};

export default HomeNavbar;
