import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const RoomCard = (props) => {
  const { room } = props;
  const [show, setShow] = useState(false);

  const { userInfo } = useSelector((state) => state.userLoginReducer);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="my-3">
      <Card className="mt-3 rounded card-room" style={{ minHeight: "27rem" }}>
        <Link to={`/rooms/${room.number}`}>
          <Card.Img
            src={room.image}
            variant="top"
            style={{ maxHeight: "190px" }}
          ></Card.Img>
        </Link>

        <Card.Body>
          <Link to={`/rooms/${room.number}`} style={{ textDecoration: "none" }}>
            <Card.Title as="div">
              <div className="title" style={{ fontSize: "1rem" }}>
                <strong>Phòng {room.number}</strong>
              </div>
            </Card.Title>
          </Link>
          <Card.Text as="div">Loại phòng: {room.type}</Card.Text>
          <Card.Text as="div" className="my-3">
            {room.rating === 0 ? (
              <Card.Text as="div" className="my-3">
                Chưa có lượt đánh giá
              </Card.Text>
            ) : (
              <Rating
                value={room.rating}
                text={` ${room.numReviews} lượt đánh giá`}
                color="#f8e825"
              />
            )}
          </Card.Text>

          <Card.Text as="h3">${room.price}/ngày</Card.Text>
          <div className="text-center mt-4">
            {room?.status &&
            (userInfo?.role === "User" || userInfo?.role === "Receptionist") ? (
              <Button
                type="button"
                className="btn btn-dark"
                onClick={handleShow}
              >
                Đặt phòng
              </Button>
            ) : !room.status &&
              (userInfo?.role === "User" ||
                userInfo?.role === "Receptionist") ? (
              <p className="text-danger mb-0 pt-2">
                <strong>Hết phòng</strong>
              </p>
            ) : (
              <></>
            )}
            <Modal
              show={show}
              onHide={handleClose}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p style={{ fontSize: "1rem" }}>
                  Bạn có thực sự muốn đặt <strong>phòng {room.number}</strong> ?
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Thoát
                </Button>
                <Link to={`/room-booking/${room.number}`}>
                  <Button variant="success" onClick={handleClose}>
                    Đồng ý
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RoomCard;
