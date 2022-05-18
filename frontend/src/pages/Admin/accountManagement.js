import React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { Popconfirm, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCustomer, getAllEmployee } from "../../redux/actions/userAction";
import { DeleteOutlined } from "@ant-design/icons";
import ReactLoading from "react-loading";

const AccountManagement = () => {
  const [isManageCustomer, setIsManageCustomer] = useState(true);
  const [isManageEmployee, setIsManageEmployee] = useState(false);

  const { isLoading: isLoadingCustomer, customers } = useSelector(
    (state) => state.customerReducer
  );
  const { isLoading: isLoadingEmployee, employees } = useSelector(
    (state) => state.employeeReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomer());
    dispatch(getAllEmployee());
  }, [dispatch]);

  const dataSourceCustomer = customers ?? [];
  const dataSourceEmployee = employees ?? [];

  const columns = [
    {
      title: "Tên",
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
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: "10%",
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
      width: "5%",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phòng này không?"
            onConfirm={() => {}}
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

  return (
    <>
      <Navbar />
      <Container style={{ padding: "0 5rem" }}>
        <h2 className="mt-5 mb-3">QUẢN LÝ TÀI KHOẢN</h2>
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
              Tài khoản khách hàng
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
              Tài khoản nhân viên
            </Button>
          </div>
          <div>
            <Button variant="success">
              <i className="fas fa-plus me-2"></i>Thêm nhân viên
            </Button>
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
