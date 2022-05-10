import React from "react";
import { useEffect } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRoomDetailsByNumber } from "../redux/actions/roomAction";

const Booking = () => {
  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { roomInfo } = useSelector((state) => state.roomDetailsReducer);
  const { number } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=room-booking/${number}`);
    }
    dispatch(getRoomDetailsByNumber(number));
  }, [navigate, userInfo, dispatch, number]);

  console.log(roomInfo);

  return (
    <>
      <Navbar />
      <Container>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item className="text-center">
                <h2 className="mt-4">THÔNG TIN ĐẶT PHÒNG</h2>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <p style={{ fontSize: "1.25rem" }} className="mb-4">
                  <strong>THÔNG TIN KHÁCH HÀNG</strong>
                </p>

                <p style={{ fontSize: "1rem" }}>
                  <strong>Tên khách hàng:</strong> {userInfo.name}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>CMND/CCCD:</strong> {userInfo.identity_card}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Email:</strong>{" "}
                  <a className="text-dark" href={`mailto:${userInfo.email}`}>
                    {userInfo.email}
                  </a>
                </p>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <p style={{ fontSize: "1.25rem" }} className="mb-4">
                  <strong>THÔNG TIN PHÒNG</strong>
                </p>

                <p style={{ fontSize: "1rem" }}>
                  <strong>Tên khách hàng:</strong> {userInfo.name}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>CMND/CCCD:</strong> {userInfo.identity_card}
                </p>
                <p style={{ fontSize: "1rem" }}>
                  <strong>Email:</strong>{" "}
                  <a className="text-dark" href={`mailto:${userInfo.email}`}>
                    {userInfo.email}
                  </a>
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Booking;
