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
import Meta from "../components/Meta";

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
    if (name === "") setMessage("Vui l??ng nh???p t??n");
    else if (idNumber === "") setMessage("Vui l??ng nh???p CMND/CCCD");
    else if (dob === "") setMessage("Vui l??ng nh???p ng??y sinh");
    else if (email === "") setMessage("Vui l??ng nh???p email");
    else if (phone === "") setMessage("Vui l??ng nh???p s??? ??i???n tho???i");
    else if (address === "") setMessage("Vui l??ng nh???p ?????a ch???");
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
      title: "S??? ph??ng",
      dataIndex: "number",
      key: "number",
      width: "15%",
    },
    {
      title: "Ng??y b???t ?????u",
      dataIndex: "startDate",
      key: "startDate",
      width: "20%",
    },
    {
      title: "Ng??y k???t th??c",
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
              title="B???n c?? ch???c ch???n mu???n h???y ?????t ph??ng n??y kh??ng?"
              onConfirm={() => {
                dispatch(cancelRental(record._id));
              }}
              okText="?????ng ??"
              cancelText="H???y"
            >
              <Button variant="danger">
                <i className="fas fa-xmark me-2"></i>
                H???y ph??ng
              </Button>
            </Popconfirm>
          );
        else return "";
      },
    },
  ];

  const columnsBill = [
    {
      title: "S??? ph??ng",
      dataIndex: "number",
      key: "number",
      width: "15%",
    },
    {
      title: "Ng??y t???o",
      dataIndex: "createDate",
      key: "createDate",
      width: "25%",
    },
    {
      title: "T???ng ti???n",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: "13%",
      render: (text, record, index) => {
        return "$" + text;
      },
    },
    {
      title: "???? thanh to??n",
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
                Thanh to??n
              </Button>
            )}
            <Modal
              show={show["showpay_" + record._id]}
              onHide={() => setShow({ ["showpay_" + record._id]: false })}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>THANH TO??N</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ fontSize: "1rem" }} className="mb-3">
                  <strong>T???NG TI???N:</strong> ${record.totalPrice}
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
                  ????ng
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
                Chi ti???t
              </Button>
            </div>
            <Modal
              show={show["show_" + record._id]}
              onHide={() => setShow({ ["show_" + record._id]: false })}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Chi ti???t h??a ????n</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ fontSize: "1rem" }}>
                  <strong>M?? h??a ????n:</strong> {record._id}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Ng??y t???o:</strong> {record.createDate}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>S??? ph??ng:</strong> {record.number}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>????n gi?? ph??ng:</strong> ${record.unitPrice}/ng??y
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>S??? ng??y thu??:</strong> {record.numOfDates}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>VAT 10%:</strong> ${record.extraPrice}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>T???NG TI???N:</strong> ${record.totalPrice}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>T??nh tr???ng:</strong>{" "}
                  {record.isPaid
                    ? `???? thanh to??n v??o ${record.paidAt}`
                    : "Ch??a thanh to??n"}
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  ????ng
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
      title: "S??? ph??ng",
      dataIndex: "roomNumber",
      key: "roomNumber",
      width: "15%",
    },
    {
      title: "Ng??y b???t ?????u ?????t",
      dataIndex: "startDate",
      key: "startDate",
      width: "25%",
    },
    {
      title: "Th???i gian",
      dataIndex: "numOfDates",
      key: "numOfDates",
      width: "13%",
      render: (text, record, index) => {
        return text + " ng??y";
      },
    },
    {
      title: "Ng?????i h???y",
      dataIndex: "user_cancel",
      key: "user_cancel",
    },
    {
      title: "Ng??y h???y",
      dataIndex: "date",
      key: "date",
    },
  ];

  // const successPaymentHandler = (paymentResult) => {
  //   billId && dispatch(payBill(billId, paymentResult));
  // };

  return (
    <>
      <Meta title="H??? s?? c?? nh??n" />
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-between">
          {isLoading || updateLoading ? (
            <Col md={4}>
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="my-4">H??? s?? c?? nh??n</h1>
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
                <h1 className="my-4">H??? s?? c?? nh??n</h1>
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
                  <Form.Label>H??? v?? t??n</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nh???p h??? t??n"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isEdit ? false : true}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>?????a ch??? email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nh???p email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isEdit ? false : true}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="identity_card" className="mt-3">
                  <Form.Label>S??? CMND/CCCD</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Nh???p CMND/CCCD"
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    disabled={isEdit ? false : true}
                  ></Form.Control>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="dob" className="mt-3">
                      <Form.Label>Ng??y sinh</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Ch??a c?? ng??y sinh"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        disabled={isEdit ? false : true}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  {customerType !== "" ? (
                    <Col>
                      <Form.Group controlId="customerType" className="mt-3">
                        <Form.Label>Lo???i kh??ch</Form.Label>
                        <Form.Control
                          as="select"
                          value={customerType}
                          onChange={(e) => setCustomerType(e.target.value)}
                          disabled={isEdit ? false : true}
                        >
                          <option value="Domestic">Kh??ch n???i ?????a</option>
                          <option value="Foreigner">Kh??ch n?????c ngo??i</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  ) : (
                    <Col>
                      <Form.Group controlId="role" className="mt-3">
                        <Form.Label>Vai tr??</Form.Label>
                        <Form.Control
                          value={
                            role === "Receptionist"
                              ? "Nh??n vi??n l??? t??n"
                              : role === "Manager"
                              ? "Qu???n l??"
                              : "Admin"
                          }
                          disabled
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  )}
                </Row>

                <Form.Group controlId="phone" className="mt-3">
                  <Form.Label>S??? ??i???n tho???i</Form.Label>
                  <PhoneInput
                    inputClass="w-100"
                    country={"us"}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    disabled={isEdit ? false : true}
                  />
                </Form.Group>
                <Form.Group controlId="address" className="mt-3">
                  <Form.Label>?????a ch???</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ch??a c?? ?????a ch???"
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
                      H???y
                    </Button>
                    <Button type="submit" className="btn btn-success my-3">
                      C???p nh???t th??ng tin
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
              <h2 className="my-4">Danh s??ch phi???u ?????t ph??ng</h2>
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
                  Kh??ng c?? phi???u ?????t ph??ng n??o
                </p>
              ) : (
                <Table
                  pagination={{ pageSize: 3, showSizeChanger: false }}
                  dataSource={dataSourceRental}
                  columns={columnsRental}
                />
              )}
              ;<h2 className="mb-4">Danh s??ch h??a ????n</h2>
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
                  Kh??ng c?? h??a ????n.
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
                    <h2 className="my-4">Danh s??ch phi???u h???y</h2>
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
              <h2>B???n ??ang ????ng nh???p v???i t?? c??ch l?? Admin</h2>
            </Col>
          )}
          {userInfo?.role === "Manager" && (
            <Col md={7} className="my-auto text-center">
              <h2>B???n ??ang ????ng nh???p v???i t?? c??ch l?? ng?????i qu???n l??</h2>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
