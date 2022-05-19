import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import MonthYearPicker from "react-month-year-picker";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRooms,
  getDensity,
  getRevenue,
} from "../../redux/actions/roomAction";
import Message from "../../components/Message";
import ReactLoading from "react-loading";

const Report = () => {
  const { allRooms } = useSelector((state) => state.allRoomsReducer);
  const { isLoading, revenue, errorMessage } = useSelector(
    (state) => state.revenueReportReducer
  );
  const { isLoading: isLoadingDensity, destiny } = useSelector(
    (state) => state.destinyReportReducer
  );

  const [showOptionRevenue, setShowOptionRevenue] = useState(false);
  const [showOptionDestiny, setShowOptionDestiny] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [room, setRoom] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    year && month && dispatch(getRevenue(year, month));
    room && year && month && dispatch(getDensity(room, year, month));
  }, [dispatch, room, year, month]);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  useEffect(() => {
    setRoom(allRooms?.rooms[0]._id);
  }, [allRooms]);

  return (
    <>
      <Navbar />
      <Container style={{ padding: "0 5rem" }}>
        <h2 className="mt-5 mb-3">XEM BÁO CÁO</h2>
        <Row>
          <Col md={6}>
            <Button
              type="button"
              className="btn btn-warning me-3"
              onClick={() => {
                setShowOptionRevenue(true);
                setShowOptionDestiny(false);
              }}
            >
              Doanh thu
            </Button>
            <Button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                setShowOptionDestiny(true);
                setShowOptionRevenue(false);
              }}
            >
              Mật độ sử dụng
            </Button>
            {(showOptionRevenue || showOptionDestiny) && (
              <MonthYearPicker
                selectedMonth={month}
                selectedYear={year}
                minYear={2000}
                maxYear={2030}
                onChangeYear={(year) => {
                  setYear(year);
                  dispatch(getRevenue(year, month));
                  dispatch(getDensity(room, year, month));
                }}
                onChangeMonth={(month) => {
                  setMonth(month);
                  dispatch(getRevenue(year, month));
                  dispatch(getDensity(room, year, month));
                }}
              />
            )}
            {showOptionDestiny && (
              <>
                <Form.Label className="fw-bold mt-2">Chọn phòng</Form.Label>
                <Form.Control
                  style={{ width: "24.25rem" }}
                  as="select"
                  value={room}
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                >
                  {allRooms?.rooms.map((room, index) => (
                    <option key={index} value={room._id}>
                      Phòng {room.number}
                    </option>
                  ))}
                </Form.Control>
              </>
            )}
          </Col>
          <Col>
            {isLoading || isLoadingDensity ? (
              <ReactLoading
                color="black"
                type="spin"
                height="45px"
              ></ReactLoading>
            ) : showOptionRevenue ? (
              <>
                <h3 className="text-center mt-5">
                  Doanh thu khách sạn trong {month}/{year}
                </h3>
                <h2 className="text-danger text-center mt-3">${revenue}</h2>
              </>
            ) : showOptionDestiny ? (
              <>
                <h3 className="text-center mt-5">
                  Số lượt sử dụng phòng trong {month}/{year}
                </h3>
                <h2 className="text-danger text-center mt-3">{destiny}</h2>
              </>
            ) : (
              ""
            )}
            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Report;
