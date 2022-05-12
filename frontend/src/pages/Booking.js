import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createBill, createRentalCard } from "../redux/actions/rentalAction";
import { getRoomDetailsByNumber } from "../redux/actions/roomAction";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { openNotification } from "../utils/notification";
import {
  CREATE_BILL_SUCCESS,
  STORE_BILL_DATA,
} from "../constants/rentalConsts";
import { encode } from "js-base64";

const Booking = () => {
  const [numDay, setNumDay] = useState(0);
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { roomInfo } = useSelector((state) => state.roomDetailsReducer);
  const { number } = useParams();
  const dispatch = useDispatch();

  const date = new Date();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=room-booking/${number}`);
    }
    dispatch(getRoomDetailsByNumber(number));
  }, [navigate, userInfo, dispatch, number]);

  const extraPrice = numDay > 0 ? roomInfo?.price * numDay * 0.1 : 0;
  const totalPrice = extraPrice !== 0 ? roomInfo?.price + extraPrice : 0;

  const bookingHandler = () => {
    if (userInfo?.role === "Manager") {
      dispatch(
        createRentalCard({
          user: userInfo._id,
          room: roomInfo._id,
          startDate: date.toISOString(),
          numOfDates: numDay,
          customerInfo: {
            name,
            identity_card: idNumber,
            phoneNumber: phone,
          },
        })
      );
    } else
      dispatch(
        createRentalCard({
          user: userInfo._id,
          room: roomInfo._id,
          startDate: date.toISOString(),
          numOfDates: numDay,
        })
      );

    localStorage.setItem(
      "billData",
      encode(
        JSON.stringify({
          unitPrice: roomInfo?.price,
          extraPrice,
          totalPrice,
          numOfDates: numDay,
        })
      )
    );

    if (userInfo?.role !== "Manager") navigate("/checkout");
    else {
      navigate("/rooms");
      openNotification("success", "Đặt phòng thành công");
    }
  };

  return (
    <>
      <Navbar />
      <Container style={{ padding: "0 10rem" }}>
        <Row className="d-flex justify-content-between">
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-center">
                <h2 className="mt-4">THÔNG TIN ĐẶT PHÒNG</h2>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <p style={{ fontSize: "1.25rem" }} className="mb-4">
                  <strong>THÔNG TIN NGƯỜI ĐẶT PHÒNG</strong>
                </p>

                <p style={{ fontSize: "1rem" }}>
                  <strong>Người đặt:</strong> {userInfo?.name}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>CMND/CCCD:</strong> {userInfo?.identity_card}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Email:</strong>{" "}
                  <a className="text-dark" href={`mailto:${userInfo?.email}`}>
                    {userInfo?.email}
                  </a>
                </p>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <p style={{ fontSize: "1.25rem" }} className="mb-4">
                  <strong>THÔNG TIN PHÒNG</strong>
                </p>

                <p style={{ fontSize: "1rem" }}>
                  <strong>Phòng:</strong> {roomInfo?.number}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Loại phòng:</strong> {roomInfo?.type}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={5}>
            <ListGroup>
              <ListGroup.Item style={{ marginTop: "4rem" }}>
                {(Number(numDay) <= 0 || !numDay) && (
                  <p className="text-danger text-italic">
                    Vui lòng nhập số ngày thuê phòng hợp lệ
                  </p>
                )}

                <div className="d-flex align-items-center">
                  <label className="me-4" style={{ fontSize: "1rem" }}>
                    <strong>Số ngày thuê phòng</strong>
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="form-control w-25"
                    onChange={(e) => setNumDay(e.target.value)}
                  ></input>
                </div>
                <div
                  className="mt-3 mb-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>Đơn giá phòng:</strong> {roomInfo?.price}/ngày
                </div>
                <div
                  className="mt-3 mb-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>VAT 10%: </strong> {extraPrice}đ
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div
                  className="my-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>THÀNH TIỀN: {totalPrice}đ</strong>
                </div>
              </ListGroup.Item>
            </ListGroup>
            {userInfo?.role !== "Manager" && (
              <div className="text-end mt-3">
                <Button
                  className="btn btn-dark w-100"
                  type="button"
                  disabled={Number(numDay) <= 0}
                  onClick={bookingHandler}
                >
                  ĐẶT PHÒNG
                </Button>
              </div>
            )}
            {userInfo?.role === "Manager" && (
              <>
                <ListGroup>
                  <ListGroup.Item style={{ marginTop: "1rem" }}>
                    <p style={{ fontSize: "1.25rem" }} className="mb-1">
                      <strong>THÔNG TIN KHÁCH HÀNG</strong>
                    </p>

                    <Form.Group controlId="name" className="mt-3">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nhập họ tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="identity_card" className="mt-3">
                      <Form.Label>CMND/CCCD</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Nhập CMND/CCCD"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="phone" className="mt-3">
                      <Form.Label>Số điện thoại</Form.Label>
                      <PhoneInput
                        inputClass="w-100"
                        country={"us"}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                      />
                    </Form.Group>
                  </ListGroup.Item>
                </ListGroup>
                <div className="text-end mt-3">
                  <Button
                    className="btn btn-dark w-100"
                    type="button"
                    disabled={
                      Number(numDay) <= 0 || !name || !idNumber || !phone
                    }
                    onClick={bookingHandler}
                  >
                    ĐẶT PHÒNG
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Booking;
