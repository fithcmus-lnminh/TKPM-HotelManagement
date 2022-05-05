import React from "react";
import { Button, Image, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../redux/actions/userAction";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="px-5 py-2 w-100 bg-dark">
      <nav className="d-flex justify-content-between align-items-center">
        <div className="fw-bold fs-4">
          <Link to="/" className="logo text-white">
            TKPM HOTEL
          </Link>
        </div>
        <div className="d-flex align-items-center h-100">
          <div>
            <NavLink
              to="/"
              className={(nav) =>
                nav.isActive ? "px-3 text-primary" : "px-3 text-gray"
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/rooms"
              className={(nav) =>
                nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
              }
            >
              Xem phòng
            </NavLink>
            {userInfo?.role === "Admin" ? (
              <>
                <NavLink
                  to="/room-management"
                  className={(nav) =>
                    nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
                  }
                >
                  Quản lý phòng
                </NavLink>
                <NavLink
                  to="/admin/account-management"
                  className={(nav) =>
                    nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
                  }
                >
                  Quản lý tài khoản
                </NavLink>
                <NavLink
                  to="/report"
                  className={(nav) =>
                    nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
                  }
                >
                  Xem báo cáo
                </NavLink>
              </>
            ) : userInfo?.role === "Manager" ? (
              <>
                <NavLink
                  to="/room-management"
                  className={(nav) =>
                    nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
                  }
                >
                  Quản lý phòng
                </NavLink>
                <NavLink
                  to="/report"
                  className={(nav) =>
                    nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
                  }
                >
                  Xem báo cáo
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/room-booking"
                  className={(nav) =>
                    nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
                  }
                >
                  Đặt phòng
                </NavLink>
                <NavLink
                  to="/contact"
                  className={(nav) =>
                    nav.isActive ? "px-3 text-white fw-bold" : "px-3 text-gray"
                  }
                >
                  Liên hệ
                </NavLink>
              </>
            )}
          </div>
        </div>
        {userInfo ? (
          <div className="d-flex align-items-center">
            <NavDropdown title={`Xin chào, ${userInfo.name}`} className="me-2">
              <Link to="/profile">
                <NavDropdown.Item>
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
            <Link to="/login" className="px-3 text-gray">
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

export default Navbar;
