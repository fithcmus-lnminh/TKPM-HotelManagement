import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container, Modal } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../redux/actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactLoading from "react-loading";
import {
  cancelRental,
  getBillByUserId,
  getCancelRental,
  getRentalCardByUserId,
  payBill,
} from "../redux/actions/rentalAction";
import { Popconfirm, Table } from "antd";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  const [dob, setDob] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState({});
  const [sdkReady, setSdkReady] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const { isLoading: updateLoading, errorMessage: updateError } = useSelector(
    (state) => state.updateUserProfileReducer
  );

  const { isLoading: isLoadingGetCancel, cancelInfo } = useSelector(
    (state) => state.getCancelRentalReducer
  );

  const { isSuccess } = useSelector((state) => state.cancelRentalReducer);
  const { isSuccess: isSuccessPayment } = useSelector(
    (state) => state.paymentReducer
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
        userProfile.role && setRole(userProfile.role);
      }
      dispatch(getCancelRental(userInfo?._id));
      dispatch(getRentalCardByUserId(userInfo?._id));
      dispatch(getBillByUserId(userInfo?._id));
    }
    updateError && setIsEdit(true);
  }, [userInfo, userProfile, dispatch, navigate, updateError]);

  useEffect(() => {
    if ((isSuccess && userInfo) || isSuccessPayment) {
      dispatch(getCancelRental(userInfo?._id));
      dispatch(getRentalCardByUserId(userInfo?._id));
      dispatch(getBillByUserId(userInfo?._id));
    }
  }, [dispatch, isSuccess, userInfo, isSuccessPayment]);

  useEffect(() => {
    const addPaypalScript = async (req, res) => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      //adding script for recognize paypal
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!billInfo?.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  });

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
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
  const dataSourceCancel = [];
  if (rentalInfo) {
    for (let item of rentalInfo.rentalCard) {
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
    for (let item of billInfo.bills) {
      dataSourceBill.push({
        _id: item._id,
        number: item.rentalCard.room.number,
        numOfDates: item.rentalCard.numOfDates,
        createDate: new Date(item.createdAt).toLocaleString(),
        unitPrice: item.unitPrice,
        extraPrice: item.extraPrice,
        totalPrice: item.totalPrice,
        isPaid: item.isPaid,
        paidAt: new Date(item.paidAt).toLocaleString(),
      });
    }
  }

  if (cancelInfo) {
    for (let item of cancelInfo) {
      dataSourceCancel.push({
        _id: item._id,
        user_cancel: item.user_cancel.name,
        roomNumber: item.roomNumber,
        startDate: new Date(item.startDate).toLocaleString(),
        numOfDates: item.numOfDates,
        date: new Date(item.date).toLocaleString(),
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
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "15%",
      render: (text, record, index) => {
        const date1 = new Date(record.startDate);
        const date2 = new Date(record.endDate);
        const date3 = new Date();
        if (date3 < date2 && date3 > date1)
          return (
            <Popconfirm
              title="Bạn có chắc chắn muốn hủy đặt phòng này không?"
              onConfirm={() => {
                dispatch(cancelRental(record._id));
              }}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button variant="danger">
                <i className="fas fa-xmark me-2"></i>
                Hủy phòng
              </Button>
            </Popconfirm>
          );
        else return "";
      },
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
      width: "25%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "13%",
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
            {!record.isPaid && (
              <Button
                variant="warning"
                className="me-1"
                onClick={() => setShow({ ["showpay_" + record._id]: true })}
              >
                Thanh toán
              </Button>
            )}
            <Modal
              show={show["showpay_" + record._id]}
              onHide={() => setShow({ ["showpay_" + record._id]: false })}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>THANH TOÁN</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ fontSize: "1rem" }} className="mb-3">
                  <strong>TỔNG TIỀN:</strong> ${record.totalPrice}
                </p>
                {!sdkReady ? (
                  <ReactLoading
                    color="black"
                    type="bars"
                    height="24px"
                    className="mb-4"
                  ></ReactLoading>
                ) : (
                  <PayPalButton
                    amount={record.totalPrice}
                    onSuccess={(paymentResult) => {
                      dispatch(payBill(record._id, paymentResult));
                      setShow({ ["showpay_" + record._id]: false });
                    }}
                  />
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>

            <div
              className={record.isPaid ? "text-center" : ""}
              style={{ display: "inline" }}
            >
              <Button
                variant="dark"
                onClick={() => {
                  setShow({ ["show_" + record._id]: true });
                }}
              >
                Chi tiết
              </Button>
            </div>
            <Modal
              show={show["show_" + record._id]}
              onHide={() => setShow({ ["show_" + record._id]: false })}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Chi tiết hóa đơn</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Mã hóa đơn:</strong> {record._id}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Ngày tạo:</strong> {record.createDate}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Số phòng:</strong> {record.number}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Đơn giá phòng:</strong> ${record.unitPrice}/ngày
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Số ngày thuê:</strong> {record.numOfDates}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>VAT 10%:</strong> ${record.extraPrice}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>TỔNG TIỀN:</strong> ${record.totalPrice}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Tình trạng:</strong>{" "}
                  {record.isPaid
                    ? `Đã thanh toán vào ${record.paidAt}`
                    : "Chưa thanh toán"}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      },
    },
  ];

  const columnsCancel = [
    {
      title: "Số phòng",
      dataIndex: "roomNumber",
      key: "roomNumber",
      width: "15%",
    },
    {
      title: "Ngày bắt đầu đặt",
      dataIndex: "startDate",
      key: "startDate",
      width: "25%",
    },
    {
      title: "Thời gian",
      dataIndex: "numOfDates",
      key: "numOfDates",
      width: "13%",
      render: (text, record, index) => {
        return text + " ngày";
      },
    },
    {
      title: "Người hủy",
      dataIndex: "user_cancel",
      key: "user_cancel",
    },
    {
      title: "Ngày hủy",
      dataIndex: "date",
      key: "date",
    },
  ];

  // const successPaymentHandler = (paymentResult) => {
  //   billId && dispatch(payBill(billId, paymentResult));
  // };

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
              {updateError && <Message variant="danger">{updateError}</Message>}

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
                  {customerType !== "" ? (
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
                  ) : (
                    <Col>
                      <Form.Group controlId="role" className="mt-3">
                        <Form.Label>Vai trò</Form.Label>
                        <Form.Control
                          value={
                            role === "Receptionist"
                              ? "Nhân viên lễ tân"
                              : role === "Manager"
                              ? "Quản lý"
                              : "Admin"
                          }
                          disabled
                        ></Form.Control>
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

          {(!userInfo?.role ||
            userInfo?.role === "User" ||
            userInfo?.role === "Receptionist") && (
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
              ) : billInfo?.bills.length === 0 ? (
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
              {cancelInfo?.length > 0 &&
                (isLoadingGetCancel ? (
                  <ReactLoading
                    color="black"
                    type="bars"
                    height="24px"
                    className="mb-4"
                  ></ReactLoading>
                ) : (
                  <>
                    <h2 className="my-4">Danh sách phiếu hủy</h2>
                    <Table
                      pagination={{ pageSize: 3, showSizeChanger: false }}
                      dataSource={dataSourceCancel}
                      columns={columnsCancel}
                    />
                  </>
                ))}
            </Col>
          )}
          {userInfo?.role === "Admin" && (
            <Col md={7} className="my-auto text-center">
              <h2>Bạn đang đăng nhập với tư cách là Admin</h2>
            </Col>
          )}
          {userInfo?.role === "Manager" && (
            <Col md={7} className="my-auto text-center">
              <h2>Bạn đang đăng nhập với tư cách là người quản lý</h2>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
