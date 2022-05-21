import React from "react";
import Header from "../components/Header";
import Navbar from "../components/HomeNavbar";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "../components/RoomCard";
import { useEffect } from "react";
import { getAllRooms, getTopRooms } from "../redux/actions/roomAction";
import ReactLoading from "react-loading";
import Footer from "../components/Footer";
import Meta from "../components/Meta";

const Home = () => {
  const { isLoading, allRooms } = useSelector((state) => state.allRoomsReducer);
  const { isLoading: isLoadingTopRooms, topRooms } = useSelector(
    (state) => state.topRoomsReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getTopRooms());
  }, [dispatch]);

  return (
    <>
      <Meta title="TKPM Hotel - Trang chủ" />
      <div className="nav-display">
        <Navbar />
      </div>

      <Header />
      <Container className="my-4">
        <h2>PHÒNG MỚI NHẤT</h2>
        <Row>
          {isLoading && (
            <div className="d-flex justify-content-center mt-5">
              <ReactLoading
                color="black"
                type="spin"
                height="45px"
              ></ReactLoading>
            </div>
          )}
          {allRooms?.rooms.slice(0, 4).map((room, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <RoomCard room={room} />
            </Col>
          ))}
        </Row>
        <h2 className="mt-5">PHÒNG CÓ ĐÁNH GIÁ CAO</h2>
        <Row>
          {isLoadingTopRooms && (
            <div className="d-flex justify-content-center mt-5">
              <ReactLoading
                color="black"
                type="spin"
                height="45px"
              ></ReactLoading>
            </div>
          )}
          {topRooms?.map((room, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              <RoomCard room={room} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
