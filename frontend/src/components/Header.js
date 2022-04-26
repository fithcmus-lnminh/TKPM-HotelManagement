import React from "react";

const Header = () => {
  return (
    <div className="bg-home position-relative">
      <div className="d-flex justify-content-center align-items-center header">
        <div className="header-item position-relative mt-5 py-4">
          <h2 className="text-center pt-4 px-3">HIỆN ĐẠI VÀ SANG TRỌNG</h2>
          <p className="text-center mt-3">
            Luôn mang những trải nghiệm và dịch vụ tốt nhất
          </p>
          <p className="text-center mb-4">
            Giá chỉ từ{" "}
            <h5 className="ms-1" style={{ display: "inline" }}>
              $100
            </h5>
          </p>
          <div className="text-center">
            <button type="button" className="btn btn-info text-center">
              Đặt phòng ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
