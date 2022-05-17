import React from "react";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCustomer, getAllEmployee } from "../../redux/actions/userAction";

const AccountManagement = () => {
  const [isManageCustomer, setIsManageCustomer] = useState(true);
  const [isManageEmployee, setIsManageEmployee] = useState(false);

  const { isLoading: isLoadingCustomer, customers } = useSelector(
    (state) => state.customerReducer
  );
  const { isLoading: isLoadingEmployee, employees } = useSelector(
    (state) => state.employeeReducer
  );

  console.log("customer", customers);
  console.log("employee", employees);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCustomer());
    dispatch(getAllEmployee());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container className="px-5">
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
        <Table
          className="mt-4"
          pagination={{ pageSize: 5, showSizeChanger: false }}
        />
      </Container>
    </>
  );
};

export default AccountManagement;
