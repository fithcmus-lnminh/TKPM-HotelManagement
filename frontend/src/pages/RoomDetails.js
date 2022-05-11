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
  Row,
} from "react-bootstrap";
import { useState } from "react";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRoomDetailsByNumber } from "../redux/actions/roomAction";

const RoomDetails = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { number } = useParams();

  const { userInfo } = useSelector((state) => state.userLoginReducer);
  const { isLoading, roomInfo } = useSelector(
    (state) => state.roomDetailsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomDetailsByNumber(number));
  }, [dispatch, number]);

  console.log(roomInfo);

  const submitHandler = (e) => {
    e.preventDefault();
    //  dispatch(createProductReview(id, { rating, comment }));
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
                </ListGroup>
              </Col>

              {/* <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col className="title">${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col className="title">
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col className="d-flex align-items-center">
                          Quantity:
                        </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (val) => (
                                <option key={val + 1} value={val + 1}>
                                  {val + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        className="btn w-100"
                        type="button"
                        onClick={addToCartHandler}
                      >
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </>
                )}
              </ListGroup>
            </Col> */}
              <Col md={4}>
                <h2>Đánh giá</h2>
                {roomInfo?.reviews?.length === 0 && (
                  <Message>Không có đánh giá</Message>
                )}
                <ListGroup>
                  {roomInfo?.reviews?.map((review, index) => (
                    <ListGroup.Item key={index}>
                      <strong className="title me-2">{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825" />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h3>Viết bình luận và đánh giá</h3>
                    {/* {errorMessageProductReview && (
                    <Message variant="danger">
                      {errorMessageProductReview}
                    </Message>
                  )} */}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="mt-2">
                          <Form.Label>Đánh giá</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Chọn ...</option>
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
                          >
                            Xác nhận
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign in</Link> to write a
                        review
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
