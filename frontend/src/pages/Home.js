import React from "react";
import Header from "../components/Header";
import Navbar from "../components/HomeNavbar";

const Home = () => {
  return (
    <>
      <div className="nav-display">
        <Navbar />
      </div>

      <Header />
    </>
  );
};

export default Home;
