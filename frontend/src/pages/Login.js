import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Navbar from "../components/HomeNavbar";
import FormContainer from "../components/FormContainer";
import { login } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import Meta from "../components/Meta";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect")
    ? searchParams.get("redirect")
    : "";

  const { isLoading, errorMessage, userInfo } = useSelector(
    (state) => state.userLoginReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage(null);
    if (email === "") setMessage("Vui lòng nhập email");
    else if (password === "") setMessage("Vui lòng nhập mật khẩu");
    else {
      dispatch(login(email, password));
    }
  };

  return (
    <>
      <Meta title="Đăng nhập" />
      <Navbar />
      <div className="login-section d-flex justify-content-center align-items-center">
        <Card
          style={{ width: "50rem", backgroundColor: "rgba(255,255,255,0.75)" }}
        >
          <FormContainer>
            <h1 className="mt-5 text-center">ĐĂNG NHẬP</h1>
            {message && <p className="text-center text-danger">{message}</p>}
            {errorMessage && (
              <p className="text-center text-danger">{errorMessage}</p>
            )}
            <Form onSubmit={submitHandler} className="mt-4">
              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>

                <div className="text-center">
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <ReactLoading
                        color="black"
                        type="cylon"
                        height="57px"
                      ></ReactLoading>
                    </div>
                  ) : (
                    <Button type="submit" className="mt-3 px-3 py-2">
                      Đăng nhập
                    </Button>
                  )}
                </div>

                {/* )} */}
              </Form.Group>
            </Form>

            <Row className="py-3 mb-3">
              <Col className="text-center">
                Do not have an account?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  className="content-link"
                >
                  Create Now
                </Link>
              </Col>
            </Row>
          </FormContainer>
        </Card>
      </div>
    </>
  );
};

export default Login;
