import React from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { Popconfirm, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteUser,
  getAllCustomer,
  getAllEmployee,
} from "../../redux/actions/userAction";
import { DeleteOutlined } from "@ant-design/icons";
import ReactLoading from "react-loading";
import Message from "../../components/Message";
import { createEmployee } from "../../redux/actions/userAction";
import Meta from "../../components/Meta";

const AccountManagement = () => {
  const [isManageCustomer, setIsManageCustomer] = useState(true);
  const [isManageEmployee, setIsManageEmployee] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Receptionist");

  const { isLoading: isLoadingCustomer, customers } = useSelector(
    (state) => state.customerReducer
  );
  const { isLoading: isLoadingEmployee, employees } = useSelector(
    (state) => state.employeeReducer
  );
  const { isLoading: isLoadingDeleteUser, isSuccess: isSuccessDeleteUser } =
    useSelector((state) => state.deleteUserReducer);
  const {
    isLoading: isLoadingCreateEmployee,
    isSuccess,
    errorMessage,
  } = useSelector((state) => state.createEmployeeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomer());
    dispatch(getAllEmployee());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
      setIdNumber("");
      setName("");
      setRole("Receptionist");
      handleClose();
      setIsManageCustomer(false);
      setIsManageEmployee(true);
    }

    if (isSuccess || (isSuccessDeleteUser && !isLoadingDeleteUser)) {
      dispatch(getAllCustomer());
      dispatch(getAllEmployee());
    }
  }, [dispatch, isSuccess, isSuccessDeleteUser]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };

  const dataSourceCustomer = customers ?? [];
  const dataSourceEmployee = employees ?? [];

  const columns = [
    {
      title: "T??n",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "identity_card",
      key: "identity_card",
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: "Vai tr??",
      dataIndex: "role",
      key: "role",
      width: "10%",
    },
    {
      title: "Ng??y t???o",
      dataIndex: "createdAt",
      key: "createdAt",
      //width: "20%",
      render: (text, record, index) => {
        const date = new Date(text);
        return date.toLocaleString();
      },
    },
    {
      title: "",
      key: "action",
      width: "5%",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="B???n c?? ch???c ch???n mu???n x??a t??i kho???n n??y kh??ng?"
            onConfirm={() => {
              dispatch(deleteUser(record._id));
            }}
            okText="X??a"
            cancelText="H???y"
          >
            <button className="btn btn-danger px-2">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name) setMessage("Vui l??ng nh???p t??n");
    else if (!idNumber) setMessage("Vui l??ng nh???p CMND/CCCD");
    else if (!email) setMessage("Vui l??ng nh???p email");
    else {
      setMessage("");
      dispatch(createEmployee({ name, identity_card: idNumber, email, role }));
    }
  };

  return (
    <>
      <Meta title="Qu???n l?? t??i kho???n" />
      <Navbar />
      <Container style={{ padding: "0 5rem" }}>
        <h2 className="mt-5 mb-3">QU???N L?? T??I KHO???N</h2>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              className={`btn ${
                isManageCustomer ? "btn-dark" : "btn-outline-dark"
              } me-3`}
              onClick={() => {
                setIsManageCustomer(true);
                setIsManageEmployee(false);
              }}
            >
              T??i kho???n kh??ch h??ng
            </Button>
            <Button
              className={`btn ${
                isManageEmployee ? "btn-dark" : "btn-outline-dark"
              } `}
              onClick={() => {
                setIsManageCustomer(false);
                setIsManageEmployee(true);
              }}
            >
              T??i kho???n nh??n vi??n
            </Button>
          </div>
          <div>
            <Button variant="success" onClick={handleShow}>
              <i className="fas fa-plus me-2"></i>Th??m nh??n vi??n
            </Button>
            <Modal
              show={showModal}
              onHide={handleClose}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>TH??M NH??N VI??N</Modal.Title>
              </Modal.Header>
              <Form onSubmit={submitHandler}>
                <Modal.Body>
                  {message && <Message variant="danger">{message}</Message>}
                  {errorMessage && (
                    <Message variant="danger">{errorMessage}</Message>
                  )}
                  <Row>
                    <Col>
                      <Form.Group controlId="name" className="">
                        <Form.Label className="fw-bold">H??? t??n</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Nh???p h??? t??n"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="role" className="">
                        <Form.Label className="fw-bold">
                          Lo???i nh??n vi??n
                        </Form.Label>
                        <Form.Control
                          as="select"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="Receptionist">Nh??n vi??n l??? t??n</option>
                          <option value="Manager">Qu???n l??</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <Form.Group controlId="idNumber">
                        <Form.Label className="fw-bold">CMND/CCCD</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Nh???p CMND/CCCD"
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="email">
                        <Form.Label className="fw-bold">Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Nh???p email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <p className="text-italic mt-3">
                    M???t kh???u m???c ?????nh c???a nh??n vi??n l?? 123456
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit" variant="dark">
                    Th??m nh??n vi??n
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          </div>
        </div>
        {isLoadingCustomer || isLoadingEmployee ? (
          <div className="d-flex justify-content-center mt-5">
            <ReactLoading
              color="black"
              type="spin"
              height="45px"
            ></ReactLoading>
          </div>
        ) : (
          <Table
            className="mt-4"
            dataSource={
              isManageCustomer ? dataSourceCustomer : dataSourceEmployee
            }
            columns={columns}
            pagination={{ pageSize: 5, showSizeChanger: false }}
          />
        )}
      </Container>
    </>
  );
};

export default AccountManagement;
