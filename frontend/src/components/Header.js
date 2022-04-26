import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLoginReducer);

  return (
    <div className="bg-home position-relative">
      <div className="d-flex justify-content-center align-items-center header">
        <div className="header-item position-relative mt-5 py-4">
          {userInfo?.role === "Admin" ? (
            <>
              <h2 className="text-center pt-4 px-3 mt-5">ADMIN</h2>
              <p className="text-center mt-3">
                Bạn đang đăng nhập với tư cách là quản trị viên
              </p>
            </>
          ) : userInfo?.role === "Manager" ? (
            <>
              <h2 className="text-center pt-4 px-3 mt-5">MANAGER</h2>
              <p className="text-center mt-3">
                Bạn đang đăng nhập với tư cách là người quản lý
              </p>
            </>
          ) : (
            <>
              <h2 className="text-center pt-4 px-3">HIỆN ĐẠI VÀ SANG TRỌNG</h2>
              <p className="text-center mt-3">
                Chúng tôi luôn mang lại những trải nghiệm và dịch vụ tốt nhất
              </p>
              <p className="text-center mb-4">Giá chỉ từ $100</p>
              <div className="text-center">
                <button type="button" className="btn btn-info text-center">
                  Đặt phòng ngay
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
