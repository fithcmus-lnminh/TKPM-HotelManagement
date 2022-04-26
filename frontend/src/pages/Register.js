import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/HomeNavbar";
import FormContainer from "../components/FormContainer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const submitHandler = (e) => {
    console.log(email, password);
    e.preventDefault();
    setMessage(null);
    if (name === "") setMessage("Vui lòng nhập họ tên");
    else if (email === "") setMessage("Vui lòng nhập email");
    else if (password === "") setMessage("Vui lòng nhập mật khẩu");
    else if (confirmPassword === "")
      setMessage("Vui lòng nhập mật khẩu xác nhận");
    else if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp");
    } else {
      //dispatch(register(name, email, password));
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-section d-flex justify-content-center align-items-center">
        <Card
          style={{
            width: "50rem",
            backgroundColor: "rgba(0,0,0,0.5)",
            marginTop: "3rem",
          }}
        >
          <FormContainer>
            <h1 className="mt-4 text-center text-white">ĐĂNG KÝ</h1>
            {message && <p className="text-center text-danger">{message}</p>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mt-3">
                <Form.Label className="text-white">Họ và tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ tên"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="mt-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label className="text-white">Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mt-3">
                <Form.Label className="text-white">
                  Xác nhận mật khẩu
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              {/* {isLoading ? (
              <Spinner animation="border" className="mt-4 ms-4">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : ( */}
              <div className="text-center">
                <Button type="submit" className="my-4 px-3 py-2">
                  ĐĂNG KÝ
                </Button>
              </div>

              {/* )} */}
            </Form>
          </FormContainer>
        </Card>
      </div>
    </>
  );
};

export default Register;
