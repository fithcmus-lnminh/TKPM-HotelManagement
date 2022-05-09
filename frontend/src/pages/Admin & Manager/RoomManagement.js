import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";

import { Popconfirm, Space, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const dataSource = [
  {
    number: "1",
    type: "Mike",
    price: 32,
    address: "10 Downing Street",
    status: true,
  },
  {
    number: "2",
    type: "John",
    price: 42,
    address: "10 Downing Street",
    status: false,
  },
];

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
    title: "Giá",
    dataIndex: "price",
    key: "price",
    width: "20%",
  },
  {
    title: "Tình trạng",
    dataIndex: "status",
    key: "status",
    //width: "20%",
    render: (text, record, index) => {
      return text ? (
        <i
          className="fas fa-check"
          style={{ color: "green", fontSize: "1.25rem" }}
        ></i>
      ) : (
        <i
          className="fas fa-xmark"
          style={{ color: "red", fontSize: "1.25rem" }}
        ></i>
      );
    },
  },
  {
    title: "",
    key: "action",
    width: "10%",
    render: (text, record) => (
      <Space size="middle">
        <button className="btn btn-warning px-2" onClick={() => {}}>
          <EditOutlined />
        </button>
        <Popconfirm
          title="Are you sure to delete this project?"
          onConfirm={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <button className="btn btn-danger px-2">
            <DeleteOutlined />
          </button>
        </Popconfirm>
      </Space>
    ),
  },
];

const RoomManagement = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h2 className="my-4">QUẢN LÝ PHÒNG</h2>
        <Table dataSource={dataSource} columns={columns} />;
      </Container>
    </>
  );
};

export default RoomManagement;
