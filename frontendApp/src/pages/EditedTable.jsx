import React from "react";
import HeaderBar from "../components/table/HeaderBar";
import BasicTable from "../components/table/Table";
import { Layout } from "antd";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;

const EditedTable = () => {
  const table_name = useSelector((state) => state.table_name);
  const table_year = useSelector((state) => state.selected_year);
  return (
    // <div className="edit">
    <Layout
      style={{
        backgroundColor: "#FAACA8",
        backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
      }}
    >
      <HeaderBar />
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            color: "#003087",
            textAlign: "center",
            fontSize: "30px",
            marginTop: "80px",
          }}
        >
          {table_year} {table_name}
        </h1>
      </div>
      <Content style={{ padding: "0 50px", marginBottom: 20 }}>
        <BasicTable />
      </Content>
      <Footer style={{ textAlign: "center", opacity: 0.8 }}>
        <div style={{ color: "gray" }}>
          Course Scheduler @2022 Created by Duke University
        </div>
      </Footer>
    </Layout>
    // </div>
  );
};

export default EditedTable;
