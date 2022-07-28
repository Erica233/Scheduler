import React from "react";
import HeaderBar from "../components/HeaderBar";
import BasicTable from "../components/Table";
import { Layout, Menu, Breadcrumb } from "antd";
import { useSelector } from "react-redux";
// import { Content } from "rsuite";

const { Header, Content, Footer } = Layout;

const EditedTable = () => {
  const table_name = useSelector((state) => state.table_name);
  const table_year = useSelector((state) => state.selected_year);
  return (
    // <div className="edit">
    <Layout>
      <HeaderBar />
      <div style={{ textAlign: "center" }}>
        <h3>{table_year} {table_name}</h3>
      </div>
      <Content style={{ padding: "0 50px", marginTop: 10 }}>
        <BasicTable />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Course Scheduler @2022 Created by Duke University
      </Footer>
    </Layout>
    // </div>
  );
};

export default EditedTable;
