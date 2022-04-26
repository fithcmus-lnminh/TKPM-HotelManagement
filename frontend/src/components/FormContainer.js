import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Row className="justify-content-center">
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  );
};

export default FormContainer;
