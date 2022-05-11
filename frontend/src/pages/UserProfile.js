import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../redux/actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactLoading from "react-loading";
import {
  getBillByUserId,
  getRentalCardByUserId,
} from "../redux/actions/rentalAction";
import { Popconfirm, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  const [dob, setDob] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { isLoading: isLoadingRental, rentalInfo } = useSelector(
    (state) => state.rentalCardReducer
  );
  const { isLoading: isLoadingBill, billInfo } = useSelector(
    (state) => state.billReducer
  );
  const { isLoading, errorMessage, userProfile } = useSelector(
    (state) => state.getUserProfileReducer
  );

  const { isLoading: updateLoading } = useSelector(
    (state) => state.updateUserProfileReducer
  );

  // const updateProfileReducer = useSelector(
  //   (state) => state.updateUserProfileReducer
  // );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!userProfile) {
        dispatch(getUserDetails(userInfo._id));
      } else {
        setName(userProfile.name);
        setEmail(userProfile.email);
        setIdNumber(userProfile.identity_card);
        userProfile.phoneNumber && setPhone(userProfile.phoneNumber);
        userProfile.address && setAddress(userProfile.address);
        userProfile.dob && setDob(userProfile.dob);
        userProfile.customerType && setCustomerType(userProfile.customerType);
      }
      dispatch(getRentalCardByUserId(userInfo?._id));
      dispatch(getBillByUserId(userInfo?._id));
    }
  }, [userInfo, userProfile, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);
    if (name === "") setMessage("Vui lòng nhập tên");
    else if (idNumber === "") setMessage("Vui lòng nhập CMND/CCCD");
    else if (dob === "") setMessage("Vui lòng nhập ngày sinh");
    else if (email === "") setMessage("Vui lòng nhập email");
    else if (phone === "") setMessage("Vui lòng nhập số điện thoại");
    else if (address === "") setMessage("Vui lòng nhập địa chỉ");
    else {
      setIsEdit(false);
      dispatch(
        updateUserProfile({
          name,
          email,
          identity_card: idNumber,
          dob,
          phone,
          address,
        })
      );
    }
  };

  const editController = () => {
    setIsEdit(true);
  };

  const cancelHandler = () => {
    setMessage("");
    setIsEdit(false);
    setName(userProfile.name);
    setEmail(userProfile.email);
    setIdNumber(userProfile.identity_card);
    userProfile.phoneNumber && setPhone(userProfile.phoneNumber);
    userProfile.address && setAddress(userProfile.address);
    userProfile.dob && setDob(userProfile.dob);
    userProfile.customerType && setCustomerType(userProfile.customerType);
  };

  const dataSourceRental = [];
  const dataSourceBill = [];
  if (rentalInfo) {
    for (let item of rentalInfo.rentalCard.reverse()) {
      let endDate = new Date(item.startDate);
      endDate.setDate(endDate.getDate() + item.numOfDates);
      dataSourceRental.push({
        _id: item._id,
        number: item.room.number,
        startDate: new Date(item.startDate).toLocaleString(),
        endDate: endDate.toLocaleString(),
      });
    }
  }

  if (billInfo) {
    console.log(billInfo.bills);
    for (let item of billInfo.bills.reverse()) {
      dataSourceBill.push({
        _id: item._id,
        number: item.room.number,
        createDate: new Date(item.createdAt).toLocaleString(),
        totalPrice: item.totalPrice,
        isPaid: item.isPaid,
      });
    }
  }

  const columnsRental = [
    {
      title: "Số phòng",
      dataIndex: "number",
      key: "number",
      width: "15%",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      width: "20%",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      width: "20%",
    },
  ];

  const columnsBill = [
    {
      title: "Số phòng",
      dataIndex: "number",
      key: "number",
      width: "15%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createDate",
      key: "createDate",
      width: "20%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "15%",
      render: (text, record, index) => {
        return "$" + text;
      },
    },
    {
      title: "Đã thanh toán",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (text, record, index) => {
        return text ? (
          <div className="text-center">
            <i
              className="fas fa-check"
              style={{ color: "green", fontSize: "1.25rem" }}
            ></i>
          </div>
        ) : (
          <div className="text-center">
            <i
              className="fas fa-xmark"
              style={{ color: "red", fontSize: "1.25rem" }}
            ></i>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "30%",
      render: (text, record, index) => {
        return (
          <>
            <Button variant="warning" className="me-1">
              Thanh toán
            </Button>
            <Button variant="dark">Chi tiết</Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-between">
          {isLoading || updateLoading ? (
            <Col md={4}>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="my-4">Hồ sơ cá nhân</h1>
              </div>
              <div className="d-flex justify-content-center mt-5">
                <ReactLoading
                  color="black"
                  type="bars"
                  height="57px"
                ></ReactLoading>
              </div>
            </Col>
          ) : (
            <Col md={4}>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="my-4">Hồ sơ cá nhân</h1>
                <Button
                  type="button"
                  className="btn btn-warning h-50"
                  onClick={editController}
                >
                  <i className="fas fa-user-pen"></i>
                </Button>
              </div>
              {message && <Message variant="danger">{message}</Message>}
              {errorMessage && (
                <Message variant="danger">{errorMessage}</Message>
              )}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mt-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isEdit ? false : true}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Địa chỉ email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isEdit ? false : true}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="identity_card" className="mt-3">
                  <Form.Label>Số CMND/CCCD</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nhập CMND/CCCD"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    disabled={isEdit ? false : true}
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="dob" className="mt-3">
                      <Form.Label>Ngày sinh</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Chưa có ngày sinh"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        disabled={isEdit ? false : true}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  {customerType !== "" && (
                    <Col>
                      <Form.Group controlId="customerType" className="mt-3">
                        <Form.Label>Loại khách</Form.Label>
                        <Form.Control
                          as="select"
                          value={customerType}
                          onChange={(e) => setCustomerType(e.target.value)}
                          disabled={isEdit ? false : true}
                        >
                          <option value="Domestic">Khách nội địa</option>
                          <option value="Foreigner">Khách nước ngoài</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  )}
                </Row>

                <Form.Group controlId="phone" className="mt-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <PhoneInput
                    inputClass="w-100"
                    country={"us"}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    disabled={isEdit ? false : true}
                  />
                </Form.Group>
                <Form.Group controlId="address" className="mt-3">
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Chưa có địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={isEdit ? false : true}
                  ></Form.Control>
                </Form.Group>
                {isEdit && (
                  <div className="text-center">
                    <Button
                      type="button"
                      className="btn btn-secondary my-3 me-3"
                      onClick={cancelHandler}
                    >
                      Hủy
                    </Button>
                    <Button type="submit" className="btn btn-success my-3">
                      Cập nhật thông tin
                    </Button>
                  </div>
                )}
              </Form>
            </Col>
          )}

          <Col md={7}>
            <h2 className="my-4">Danh sách phiếu đặt phòng</h2>
            {isLoadingRental ? (
              <div className="d-flex justify-content-center mt-2">
                <ReactLoading
                  color="black"
                  type="bars"
                  height="24px"
                  className="mb-4"
                ></ReactLoading>
              </div>
            ) : !rentalInfo ? (
              <p
                className="text-danger text-italic"
                style={{ fontSize: "1rem" }}
              >
                Không có phiếu đặt phòng nào
              </p>
            ) : (
              <Table
                pagination={{ pageSize: 3, showSizeChanger: false }}
                dataSource={dataSourceRental}
                columns={columnsRental}
              />
            )}
            ;<h2 className="mb-4">Danh sách hóa đơn</h2>
            {isLoadingBill ? (
              <div className="d-flex justify-content-center mt-2">
                <ReactLoading
                  color="black"
                  type="bars"
                  height="24px"
                  className="mb-4"
                ></ReactLoading>
              </div>
            ) : billInfo.bills.length === 0 ? (
              <p
                className="text-danger text-italic"
                style={{ fontSize: "1rem" }}
              >
                Không có hóa đơn.
              </p>
            ) : (
              <Table
                pagination={{ pageSize: 3, showSizeChanger: false }}
                dataSource={dataSourceBill}
                columns={columnsBill}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
