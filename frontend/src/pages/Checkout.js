import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ReactLoading from "react-loading";
import { CheckCircleOutlined } from "@ant-design/icons";
import { PayPalButton } from "react-paypal-button-v2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { isLoading, billInfo } = useSelector(
    (state) => state.createBillReducer
  );
  console.log(billInfo);
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Container style={{ padding: "0 10rem" }}>
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <ReactLoading
              color="black"
              type="bars"
              height="57px"
            ></ReactLoading>
          </div>
        ) : (
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
                        {billInfo?.numOfDates}
                      </label>
                    </div>
                    <div
                      className="mt-3 mb-2"
                      style={{ fontSize: "1rem", display: "block" }}
                    >
                      <strong>Đơn giá phòng:</strong> {billInfo?.unitPrice}/ngày
                    </div>
                    <div
                      className="mt-3 mb-2"
                      style={{ fontSize: "1rem", display: "block" }}
                    >
                      <strong>VAT 10%: </strong> {billInfo?.extraPrice}đ
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div
                      className="my-2"
                      style={{ fontSize: "1rem", display: "block" }}
                    >
                      <strong>THÀNH TIỀN: {billInfo?.totalPrice}đ</strong>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <div className="text-center">
                  <Button
                    variant="secondary"
                    className="mt-3 rounded-pill px-4 py-2"
                    onClick={() => {
                      navigate("/rooms");
                    }}
                  >
                    THANH TOÁN SAU
                  </Button>
                </div>
              </Col>

              <Col>
                <h4 className="mt-5 d-flex justify-content-center">
                  THANH TOÁN NGAY
                </h4>
                <PayPalButton
                  amount={billInfo?.totalPrice}
                  // onSuccess={successPaymentHandler}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Checkout;
