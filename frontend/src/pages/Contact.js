import React from "react";
import { Container } from "react-bootstrap";
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";

const Contact = () => {
  return (
    <>
      <Meta title="Liên hệ" />
      <Navbar />
      <Container className="text-center mt-5">
        <h4>ĐỒ ÁN MÔN HỌC THIẾT KẾ PHẦN MỀM</h4>
        <h4>
          Mọi thắc mắc xin liên hệ:{" "}
          <a href="mailto:19120581@student.hcmus.edu.vn">
            19120581@student.hcmus.edu.vn
          </a>
        </h4>
        <h4>All rights reserved</h4>
      </Container>
    </>
  );
};

export default Contact;
