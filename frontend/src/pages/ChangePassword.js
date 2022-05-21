import React from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import Navbar from "../components/Navbar";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword } from "../redux/actions/userAction";
import Message from "../components/Message";
import Meta from "../components/Meta";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const { isLoading, errorMessage } = useSelector(
    (state) => state.changePasswordReducer
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    if (oldPassword === "") setMessage("Vui lòng nhập mật khẩu cũ");
    else if (newPassword === "") setMessage("Vui lòng nhập mật khẩu mới");
    else if (confirmNewPassword === "")
      setMessage("Vui lòng nhập xác nhận mật khẩu mới");
    else if (newPassword !== confirmNewPassword) {
      setMessage("Mật khẩu mới không khớp");
    } else {
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setMessage("");
      dispatch(changeUserPassword({ oldPassword, newPassword }));
    }
  };

  return (
    <>
      <Meta title="Đổi mật khẩu" />
      <Navbar />
      <Container>
        <FormContainer>
          <Card className="px-5 pb-5 pt-4 mt-5 w-75 mx-auto">
            <h2 className="text-center">ĐỔI MẬT KHẨU</h2>
            {message && <Message variant="danger">{message}</Message>}
            {errorMessage && <Message variant="danger">{errorMessage}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="oldPassword" className="mt-3">
                <Form.Label style={{ fontSize: "1rem" }}>
                  <strong>Mật khẩu cũ</strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu cũ"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="newPassword" className="mt-3">
                <Form.Label style={{ fontSize: "1rem" }}>
                  <strong>Mật khẩu mới</strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmNewPassword" className="mt-3">
                <Form.Label style={{ fontSize: "1rem" }}>
                  <strong>Xác nhận mật khẩu mới</strong>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <div className="mt-3 text-center">
                <Button
                  type="submit"
                  variant="dark"
                  className="px-3 py-2"
                  disabled={isLoading}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </Form>
          </Card>
        </FormContainer>
      </Container>
    </>
  );
};

export default ChangePassword;
