import React from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Image,
} from "react-bootstrap";
import Navbar from "../../components/Navbar";

import { Popconfirm, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  updateRoom,
} from "../../redux/actions/roomAction";
import ReactLoading from "react-loading";
import { useState } from "react";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import Message from "../../components/Message";
import Meta from "../../components/Meta";

const RoomManagement = () => {
  const dispatch = useDispatch();
  const { isLoading, allRooms } = useSelector((state) => state.allRoomsReducer);
  const {
    isLoading: isLoadingCreateRoom,
    isSuccess,
    errorMessage,
  } = useSelector((state) => state.roomCreateReducer);
  const {
    isLoading: isLoadingUpdateRoom,
    isSuccess: isSuccessUpdateRoom,
    errorMessage: errorUpdateRoom,
  } = useSelector((state) => state.updateRoomReducer);
  const {
    isLoading: isLoadingDeleteRoom,
    isSuccess: isSuccessDeleteRoom,
    errorMessage: errorDeleteRoom,
  } = useSelector((state) => state.deleteRoomReducer);

  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("Phòng đơn");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesciption] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState({});
  const [isChangeImg, setIsChangeImg] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");

  // Get production API keys from Upload.io
  const uploader = new Uploader({
    apiKey: "free",
  });

  const handleClose = () => {
    setShowModal(false);
    setShow({});
  };
  const handleShow = () => {
    setShowModal(true);
    setNumber("");
    setPrice("");
    setMessage("");
    setDesciption("");
    setType("Phòng đơn");
  };

  useEffect(() => {
    dispatch(getAllRooms());
  }, []);

  useEffect(() => {
    (isSuccess || isSuccessUpdateRoom || isSuccessDeleteRoom) &&
      dispatch(getAllRooms());
    if (
      (!errorMessage && isSuccess) ||
      (!errorUpdateRoom && isSuccessUpdateRoom)
    ) {
      setMessage("");
      setNumber("");
      setPrice("");
      setMessage("");
      setDesciption("");
      setType("Phòng đơn");
      handleClose();
    }
    if (isSuccessUpdateRoom) dispatch({ type: "UPDATE_ROOM_RESET" });
  }, [
    dispatch,
    isSuccess,
    isSuccessUpdateRoom,
    errorMessage,
    errorUpdateRoom,
    isSuccessDeleteRoom,
  ]);

  const submitEditHandler = (e) => {
    e.preventDefault();

    if (!number) setMessage("Vui lòng nhập số phòng");
    else if (!price) setMessage("Vui lòng nhập đơn giá phòng");
    else if (!description) setMessage("Vui lòng nhập mô tả");
    else if (!image && isChangeImg) setMessage("Vui lòng upload hình ảnh");
    else {
      dispatch(
        updateRoom(id, { currentRoom, number, type, price, image, description })
      );
    }
  };

  const dataSource = allRooms ? allRooms.rooms : [];

  const columns = [
    {
      title: "Số phòng",
      dataIndex: "number",
      key: "number",
      width: "10%",
    },
    {
      title: "Loại phòng",
      dataIndex: "type",
      key: "type",
      width: "15%",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: "15%",
      render: (text, record, index) => {
        return "$" + text + "/ngày";
      },
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (text, record, index) => {
        return text ? (
          <div className="text-center">
            <i
              className="fas fa-check"
              style={{ color: "green", fontSize: "1.25rem" }}
            ></i>
          </div>
        ) : (
          <div className="text-center">
            <i
              className="fas fa-xmark"
              style={{ color: "red", fontSize: "1.25rem" }}
            ></i>
          </div>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      //width: "20%",
      render: (text, record, index) => {
        const date = new Date(text);
        return date.toLocaleString();
      },
    },
    {
      title: "Chỉnh sửa lần cuối",
      dataIndex: "updatedAt",
      key: "updatedAt",
      //width: "20%",
      render: (text, record, index) => {
        const date = new Date(text);
        return date.toLocaleString();
      },
    },
    {
      title: "",
      key: "action",
      width: "10%",
      render: (text, record) => (
        <Space size="middle">
          <button
            className="btn btn-warning px-2"
            onClick={() => {
              setShow({ ["showedit_" + record.number]: true });
              setId(record._id);
              setNumber(record.number);
              setType(record.type);
              setPrice(record.price);
              setImage(record.image);
              setDesciption(record.description);
              setCurrentRoom(record.number);
            }}
          >
            <EditOutlined />
          </button>
          <Modal
            size="lg"
            show={show["showedit_" + record.number]}
            onHide={() => setShow({ ["showedit_" + record.number]: false })}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>CHỈNH SỬA PHÒNG</Modal.Title>
            </Modal.Header>
            <Form onSubmit={submitEditHandler}>
              <Modal.Body>
                {message && <Message variant="danger">{message}</Message>}
                {errorUpdateRoom && (
                  <Message variant="danger">{errorUpdateRoom}</Message>
                )}
                <Row>
                  <Col>
                    <Form.Group controlId="number" className="">
                      <Form.Label className="fw-bold">Số phòng</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Nhập số phòng"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="type" className="">
                      <Form.Label className="fw-bold">Loại phòng</Form.Label>
                      <Form.Control
                        as="select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value="Phòng đơn">Phòng đơn</option>
                        <option value="Phòng đôi">Phòng đôi</option>
                        <option value="Phòng ba">Phòng ba</option>
                        <option value="Phòng bốn">Phòng bốn</option>
                        <option value="Phòng VIP">Phòng VIP</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="price" className="">
                      <Form.Label className="fw-bold">
                        Đơn giá theo ngày ($)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Nhập đơn giá"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Group controlId="description">
                      <Form.Label className="fw-bold">Mô tả phòng</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Nhập mô tả phòng"
                        value={description}
                        onChange={(e) => setDesciption(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                {isChangeImg ? (
                  <Row className="mt-3">
                    <div className="d-flex justify-content-between">
                      <Form.Label className="fw-bold mb-0">
                        Upload hình ảnh
                      </Form.Label>
                      <span
                        className="change-text"
                        onClick={() => setIsChangeImg(false)}
                      >
                        Hủy thay đổi
                      </span>
                    </div>

                    <UploadDropzone
                      uploader={uploader}
                      options={{
                        editor: { images: { crop: false } },
                        mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
                        showRemoveButton: true,
                      }}
                      onUpdate={(file) =>
                        setImage(file[0].originalFile.fileUrl)
                      }
                      width="100%"
                      height="11rem"
                    />
                  </Row>
                ) : (
                  <div className="text-center mt-3">
                    <Image src={record.image} style={{ maxHeight: "15rem" }} />
                    <p
                      className="change-text mt-1"
                      onClick={() => setIsChangeImg(true)}
                    >
                      Thay đổi hình ảnh
                    </p>
                  </div>
                )}
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow({ ["showedit_" + record.number]: false });
                    setMessage("");
                  }}
                >
                  Đóng
                </Button>
                <Button
                  type="submit"
                  variant="dark"
                  disabled={isLoadingUpdateRoom}
                >
                  Cập nhật
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phòng này không?"
            onConfirm={() => {
              dispatch(deleteRoom(record._id));
            }}
            okText="Xóa"
            cancelText="Hủy"
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

    if (!number) setMessage("Vui lòng nhập số phòng");
    else if (!price) setMessage("Vui lòng nhập đơn giá phòng");
    else if (!description) setMessage("Vui lòng nhập mô tả");
    else if (!image) setMessage("Vui lòng upload hình ảnh");
    else {
      dispatch(createRoom({ number, type, price, image, description }));
    }
  };

  return (
    <>
      <Meta title="Quản lý phòng" />
      <Navbar />
      <Container style={{ padding: "0 5rem" }}>
        <h2 className="mt-5 mb-3">QUẢN LÝ PHÒNG</h2>
        {isLoading ? (
          <div className="d-flex justify-content-center mt-5">
            <ReactLoading
              color="black"
              type="spin"
              height="45px"
            ></ReactLoading>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between mb-2">
              <p style={{ fontSize: "1rem" }} className="text-italic">
                Danh sách gồm {allRooms?.rooms.length} phòng
              </p>
              <Button variant="success" onClick={handleShow}>
                <i className="fas fa-plus me-2"></i>Thêm phòng
              </Button>
              <Modal
                show={showModal}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>THÊM PHÒNG</Modal.Title>
                </Modal.Header>
                <Form onSubmit={submitHandler}>
                  <Modal.Body>
                    {message && <Message variant="danger">{message}</Message>}
                    {errorMessage && (
                      <Message variant="danger">{errorMessage}</Message>
                    )}
                    <Row>
                      <Col>
                        <Form.Group controlId="number" className="">
                          <Form.Label className="fw-bold">Số phòng</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Nhập số phòng"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="type" className="">
                          <Form.Label className="fw-bold">
                            Loại phòng
                          </Form.Label>
                          <Form.Control
                            as="select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                          >
                            <option value="Phòng đơn">Phòng đơn</option>
                            <option value="Phòng đôi">Phòng đôi</option>
                            <option value="Phòng ba">Phòng ba</option>
                            <option value="Phòng bốn">Phòng bốn</option>
                            <option value="Phòng VIP">Phòng VIP</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group controlId="price" className="">
                          <Form.Label className="fw-bold">
                            Đơn giá theo ngày ($)
                          </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Nhập đơn giá"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <Form.Group controlId="description">
                          <Form.Label className="fw-bold">
                            Mô tả phòng
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            placeholder="Nhập mô tả phòng"
                            value={description}
                            onChange={(e) => setDesciption(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Form.Label className="fw-bold mb-0">
                        Upload hình ảnh
                      </Form.Label>
                      <UploadDropzone
                        uploader={uploader}
                        options={{
                          editor: { images: { crop: false } },
                          mimeTypes: ["image/jpg", "image/jpeg", "image/png"],
                          showRemoveButton: true,
                        }}
                        onUpdate={(file) =>
                          setImage(file[0].originalFile.fileUrl)
                        }
                        width="100%"
                        height="11rem"
                      />
                    </Row>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      type="submit"
                      variant="dark"
                      disabled={isLoadingCreateRoom}
                    >
                      Thêm phòng
                    </Button>
                  </Modal.Footer>
                </Form>
              </Modal>
            </div>

            <Table
              pagination={{ pageSize: 5, showSizeChanger: false }}
              dataSource={dataSource}
              columns={columns}
            />
          </>
        )}
        ;
      </Container>
    </>
  );
};

export default RoomManagement;
