import React from "react";
import Header from "../components/Header";
import Navbar from "../components/HomeNavbar";
import { Carousel, Image } from "antd";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  const { isLoading, allRooms, errorMessage } = useSelector(
    (state) => state.allRoomsReducer
  );
  return (
    <>
      <div className="nav-display">
        <Navbar />
      </div>

      <Header />
      {/* <Container className="my-5">
        <Image.PreviewGroup>
          <Carousel autoplay>
            {allRooms?.map((room, index) => {
              return (
                <Image
                  key={index}
                  src={room.image}
                  preview={{ getContainer: "#root" }}
                />
              );
            })}
          </Carousel>
        </Image.PreviewGroup>
      </Container> */}
    </>
  );
};

export default Home;
