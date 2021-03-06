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
import Meta from "../components/Meta";

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

  const extraPrice =
    numDay > 0 ? (roomInfo?.price * numDay * 0.1).toFixed(2) : 0;
  const totalPriceWithoutForeigner =
    extraPrice !== 0 ? Number(roomInfo?.price) + Number(extraPrice) : 0;
  const totalPrice =
    userInfo?.customerType === "Foreigner"
      ? (totalPriceWithoutForeigner * 1.1).toFixed(2)
      : totalPriceWithoutForeigner.toFixed(2);

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
      openNotification("success", "?????t ph??ng th??nh c??ng");
    }
  };

  return (
    <>
      <Meta title="?????t ph??ng" />
      <Navbar />
      <Container style={{ padding: "0 10rem" }}>
        <Row className="d-flex justify-content-between">
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-center">
                <h2 className="mt-4">TH??NG TIN ?????T PH??NG</h2>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <p style={{ fontSize: "1.25rem" }} className="mb-4">
                  <strong>TH??NG TIN NG?????I ?????T PH??NG</strong>
                </p>

                <p style={{ fontSize: "1rem" }}>
                  <strong>Ng?????i ?????t:</strong> {userInfo?.name}
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
                  <strong>TH??NG TIN PH??NG</strong>
                </p>

                <p style={{ fontSize: "1rem" }}>
                  <strong>Ph??ng:</strong> {roomInfo?.number}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Lo???i ph??ng:</strong> {roomInfo?.type}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={5}>
            <ListGroup>
              <ListGroup.Item style={{ marginTop: "4rem" }}>
                {(Number(numDay) <= 0 || !numDay) && (
                  <p className="text-danger text-italic">
                    Vui l??ng nh???p s??? ng??y thu?? ph??ng h???p l???
                  </p>
                )}

                <div className="d-flex align-items-center">
                  <label className="me-4" style={{ fontSize: "1rem" }}>
                    <strong>S??? ng??y thu?? ph??ng</strong>
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
                  <strong>????n gi?? ph??ng:</strong> ${roomInfo?.price}/ng??y
                </div>
                <div
                  className="mt-3 mb-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>VAT 10%: </strong> ${extraPrice}
                </div>
                <div
                  className="mt-3 mb-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <p className="text-italic">
                    N???u b???n l?? ng?????i n?????c ngo??i th?? t???ng ti???n s??? ph??? thu th??m
                    10%
                  </p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <div
                  className="my-2"
                  style={{ fontSize: "1rem", display: "block" }}
                >
                  <strong>TH??NH TI???N: ${totalPrice}</strong>
                </div>
              </ListGroup.Item>
            </ListGroup>
            {userInfo?.role !== "Receptionist" && (
              <div className="text-end mt-3">
                <Button
                  className="btn btn-dark w-100"
                  type="button"
                  disabled={Number(numDay) <= 0}
                  onClick={bookingHandler}
                >
                  ?????T PH??NG
                </Button>
              </div>
            )}
            {userInfo?.role === "Receptionist" && (
              <>
                <ListGroup>
                  <ListGroup.Item style={{ marginTop: "1rem" }}>
                    <p style={{ fontSize: "1.25rem" }} className="mb-1">
                      <strong>TH??NG TIN KH??CH H??NG</strong>
                    </p>

                    <Form.Group controlId="name" className="mt-3">
                      <Form.Label>H??? v?? t??n</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nh???p h??? t??n"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="identity_card" className="mt-3">
                      <Form.Label>CMND/CCCD</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Nh???p CMND/CCCD"
                        value={idNumber}
                        onChange={(e) => setIdNumber(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="phone" className="mt-3">
                      <Form.Label>S??? ??i???n tho???i</Form.Label>
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
                    ?????T PH??NG
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
