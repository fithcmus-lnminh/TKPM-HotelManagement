import React from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReactLoading from "react-loading";
import Message from "../components/Message";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createRoomReview,
  getRoomDetailsByNumber,
} from "../redux/actions/roomAction";
import { openNotification } from "../utils/notification";
import { CREATE_REVIEW_RESET } from "../constants/roomConsts";

const RoomDetails = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { number } = useParams();

  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { isLoading, roomInfo } = useSelector(
    (state) => state.roomDetailsReducer
  );

  const {
    isLoading: isLoadingCreateReview,
    isSuccess: isSuccessCreateReview,
    errorMessage: errorCreateReview,
  } = useSelector((state) => state.roomCreateReviewReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccessCreateReview) {
      openNotification("success", "Đánh giá thành công");
      setRating("");
      setComment("");
      dispatch({ type: CREATE_REVIEW_RESET });
    }
    dispatch(getRoomDetailsByNumber(number));
  }, [dispatch, number, isSuccessCreateReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!rating) setMessage("Vui lòng chọn đánh giá");
    else if (!comment) setMessage("Vui lòng nhập bình luận");
    else {
      setMessage("");
      dispatch(createRoomReview(number, { rating, comment }));
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <Link to="/rooms" className="btn btn-dark py-2 mb-2 mt-4">
          <i className="fas fa-angle-left me-2"></i>GO BACK
        </Link>
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
            <Row>
              <Col md={4}>
                <Image src={roomInfo?.image} alt={roomInfo?.number} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>Phòng {roomInfo?.number}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={roomInfo?.rating}
                      text={` ${roomInfo?.numReviews} lượt đánh giá`}
                      color="#f8e825"
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Loại phòng: {roomInfo?.type}</ListGroup.Item>
                  <ListGroup.Item>
                    Đơn giá: ${roomInfo?.price}/ngày
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Tình trạng:{" "}
                    {roomInfo?.status ? (
                      <p className="text-success" style={{ display: "inline" }}>
                        Còn phòng
                      </p>
                    ) : (
                      <p className="text-danger" style={{ display: "inline" }}>
                        Hết phòng
                      </p>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Mô tả phòng: {roomInfo?.description}
                  </ListGroup.Item>
                  {roomInfo?.status && (
                    <>
                      <Button
                        type="button"
                        className="btn btn-dark mt-2"
                        onClick={handleShow}
                      >
                        Đặt phòng
                      </Button>
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
                            Bạn có thực sự muốn đặt{" "}
                            <strong>phòng {roomInfo.number}</strong> ?
                          </p>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Thoát
                          </Button>
                          <Link to={`/room-booking/${roomInfo.number}`}>
                            <Button variant="success" onClick={handleClose}>
                              Đồng ý
                            </Button>
                          </Link>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}
                </ListGroup>
              </Col>
              <Col md={4}>
                <h2>Đánh giá</h2>
                {roomInfo?.reviews?.length === 0 && (
                  <Message>Không có đánh giá</Message>
                )}
                <ListGroup>
                  {roomInfo?.reviews?.map((review, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex">
                        <strong className="title me-2">{review.name}</strong>
                        <Rating value={review.rating} color="#f8e825" />
                      </div>

                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h3>Viết bình luận và đánh giá</h3>
                    {errorCreateReview && !message && (
                      <Message variant="danger">{errorCreateReview}</Message>
                    )}
                    {message && <Message variant="danger">{message}</Message>}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="mt-2">
                          <Form.Label>Đánh giá</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="" disabled>
                              Chọn ...
                            </option>
                            <option value="1">1 - Rất tệ</option>
                            <option value="2">2 - Tệ</option>
                            <option value="3">3 - Tốt</option>
                            <option value="4">4 - Rất tốt</option>
                            <option value="5">5 - Xuất sắc</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment" className="mt-3">
                          <Form.Label>Bình luận</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <div className="text-center">
                          <Button
                            type="submit"
                            variant="dark"
                            className="mt-2 w-50"
                            disabled={isLoadingCreateReview}
                          >
                            Xác nhận
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      <Message>
                        Vui lòng
                        <Link to={`/login?redirect=rooms/${roomInfo?.number}`}>
                          đăng nhập
                        </Link>{" "}
                        để đánh giá phòng
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>

            <Row className=""></Row>
          </>
        )}
      </Container>
    </>
  );
};

export default RoomDetails;
