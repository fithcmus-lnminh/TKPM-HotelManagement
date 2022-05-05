import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { getUserDetails } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Navbar from "../components/Navbar";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState(0);
  const [dob, setDob] = useState("");
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
        setDob(userProfile.dob);
      }
    }
  }, [userInfo, userProfile, dispatch, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);
    if (name === "") setMessage("Name is required");
    else if (email === "") setMessage("Email is required");
    else {
      // dispatch(
      //   updateUserDetails({ _id: userProfile._id, name, email, password })
      // );
    }
  };

  const editController = () => {
    setIsEdit(!isEdit);
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
              <Form.Group controlId="idNumber" className="mt-3">
                <Form.Label>Số CMND/CCCD</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nhập CMND/CCCD"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  disabled={isEdit ? false : true}
                ></Form.Control>
              </Form.Group>
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
              <Form.Group controlId="phone" className="mt-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Chưa có số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isEdit ? false : true}
                ></Form.Control>
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
                  <Button type="submit" className="btn btn-success my-3">
                    Cập nhật thông tin
                  </Button>
                </div>
              )}
            </Form>
          </Col>
          <Col md={7}>
            <h1 className="my-4">Danh sách phiếu đặt phòng</h1>
            <p className="text-danger font-italic">
              Không có phiếu đặt phòng nào
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
