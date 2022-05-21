import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { CheckCircleOutlined } from "@ant-design/icons";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { createBill } from "../redux/actions/rentalAction";
import { decode, encode } from "js-base64";
import Meta from "../components/Meta";

const Checkout = () => {
  const { billInfo } = useSelector((state) => state.createBillReducer);

  if (billInfo?._id)
    localStorage.setItem("billId", encode(JSON.stringify(billInfo?._id)));

  const { rentalInfo } = useSelector((state) => state.createRentalCardReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (rentalInfo)
      dispatch(createBill({ ...billData, rentalCard: rentalInfo?._id }));
  }, [rentalInfo]);

  const billData = localStorage.getItem("billData")
    ? JSON.parse(decode(localStorage.getItem("billData")))
    : {};

  const navigate = useNavigate();
  return (
    <>
      <Meta title="Đặt phòng thành công" />
      <Navbar />
      <Container style={{ padding: "0 10rem" }}>
        <>
          <div
            className="text-success mt-5 d-flex justify-content-center align-items-center"
            style={{ fontSize: "2.25rem" }}
          >
            <CheckCircleOutlined
              className="me-4"
              style={{ fontSize: "3.5rem" }}
            />{" "}
            ĐẶT PHÒNG THÀNH CÔNG
          </div>
          <Row>
            <Col md={6}>
              <ListGroup>
                <ListGroup.Item style={{ marginTop: "4rem" }}>
                  <div className="d-flex align-items-center">
                    <label className="me-4" style={{ fontSize: "1rem" }}>
                      <strong>Số ngày thuê phòng:</strong>{" "}
                      {billData?.numOfDates}
                    </label>
                  </div>
                  <div
                    className="mt-3 mb-2"
                    style={{ fontSize: "1rem", display: "block" }}
                  >
                    <strong>Đơn giá phòng:</strong> ${billData?.unitPrice}
                    /ngày
                  </div>
                  <div
                    className="mt-3 mb-2"
                    style={{ fontSize: "1rem", display: "block" }}
                  >
                    <strong>VAT 10%: </strong> ${billData?.extraPrice}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div
                    className="my-2"
                    style={{ fontSize: "1rem", display: "block" }}
                  >
                    <strong>THÀNH TIỀN: ${billData?.totalPrice}</strong>
                  </div>
                </ListGroup.Item>
              </ListGroup>
              <div className="text-center">
                <Button
                  variant="secondary"
                  className="mt-3 rounded-pill px-4 py-2"
                  onClick={() => {
                    navigate("/rooms");
                    localStorage.removeItem("billData");
                  }}
                >
                  THANH TOÁN SAU
                </Button>
              </div>
            </Col>

            <Col>
              <h3
                className="d-flex justify-content-center"
                style={{ marginTop: "8rem" }}
              >
                THANH TOÁN NGAY{" "}
                <Link to="/profile" className="ms-2">
                  TẠI ĐÂY
                </Link>
              </h3>
            </Col>
          </Row>
        </>
      </Container>
    </>
  );
};

export default Checkout;
