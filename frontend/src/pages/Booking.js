import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createRentalCard } from "../redux/actions/rentalAction";
import { getRoomDetailsByNumber } from "../redux/actions/roomAction";

const Booking = () => {
  const [numDay, setNumDay] = useState(0);
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
    dispatch(
      createRentalCard({
        user: userInfo._id,
        room: roomInfo._id,
        startDate: date.toISOString(),
        numOfDates: numDay,
      })
    );
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
                  <strong>THÔNG TIN KHÁCH HÀNG</strong>
                </p>

                <p style={{ fontSize: "1rem" }}>
                  <strong>Tên khách hàng:</strong> {userInfo?.name}
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Booking;
