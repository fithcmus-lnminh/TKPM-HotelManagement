import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";

import { Popconfirm, Space, Table } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRooms } from "../../redux/actions/roomAction";
import ReactLoading from "react-loading";

const RoomManagement = () => {
  const dispatch = useDispatch();
  const { isLoading, allRooms } = useSelector((state) => state.allRoomsReducer);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  const dataSource = allRooms ? allRooms.rooms : [];

  const columns = [
    {
      title: "Số phòng",
      dataIndex: "number",
      key: "number",
      width: "15%",
    },
    {
      title: "Loại phòng",
      dataIndex: "type",
      key: "type",
      width: "20%",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      width: "20%",
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

  return (
    <>
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
            <p style={{ fontSize: "1rem" }} className="text-italic">
              Danh sách gồm {allRooms?.rooms.length} phòng
            </p>
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
