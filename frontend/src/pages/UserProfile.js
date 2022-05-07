import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  const [dob, setDob] = useState("");
  const [customerType, setCustomerType] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { isLoading, errorMessage, userProfile } = useSelector(
    (state) => state.getUserProfileReducer
  );

  // const updateProfileReducer = useSelector(
  //   (state) => state.updateUserProfileReducer
  // );

  console.log(userProfile);

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
    setIsEdit(false);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Row className="d-flex justify-content-between">
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
            {errorMessage && <Message variant="danger">{errorMessage}</Message>}

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
                {/* <Form.Control
                  type="text"
                  placeholder="Chưa có số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isEdit ? false : true}
                ></Form.Control> */}
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
          <Col md={7}>
            <h1 className="my-4">Danh sách phiếu đặt phòng</h1>
            <p className="text-danger text-italic">
              Không có phiếu đặt phòng nào
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
