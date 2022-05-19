import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { getAllRooms } from "../redux/actions/roomAction";
import { Input } from "antd";
import RoomCard from "../components/RoomCard";
import ReactLoading from "react-loading";
import { useNavigate, useParams } from "react-router-dom";

const { Search } = Input;

const Rooms = () => {
  const { keyword } = useParams();
  const { isLoading, allRooms, errorMessage } = useSelector(
    (state) => state.allRoomsReducer
  );

  const { userInfo } = useSelector((state) => state.userLoginReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRooms(keyword));
  }, [dispatch, keyword]);

  const navigate = useNavigate();

  const onSearch = (value) => {
    if (value.trim()) {
      navigate(`/search/${value}`);
    } else {
      navigate("/rooms");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <div className="text-center mt-4">
          <Search
            size="large"
            style={{ width: "50%" }}
            placeholder="Tra cứu phòng"
            onSearch={onSearch}
            enterButton
          />
        </div>

        <h2 className="mt-3">DANH SÁCH PHÒNG</h2>
        {!allRooms && !isLoading && (
          <p
            className="text-danger"
            style={{ fontSize: "1rem", fontStyle: "italic" }}
          >
            Không có phòng nào
          </p>
        )}
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <ReactLoading
              color="black"
              type="bars"
              height="57px"
            ></ReactLoading>
          </div>
        ) : (
          <Row>
            {allRooms?.rooms?.map((room, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <RoomCard room={room} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Rooms;
