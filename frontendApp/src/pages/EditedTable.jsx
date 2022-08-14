import React, { useEffect, useState } from "react";
import HeaderBar from "../components/table/HeaderBar";
import BasicTable from "../components/table/Table";
import { Layout} from "antd";
import { useSelector } from "react-redux";

const { Header, Content, Footer } = Layout;

const EditedTable = () => {
  const table_name = useSelector((state) => state.table_name);
  const table_year = useSelector((state) => state.selected_year);
  const [windowDimension, setWindowDimension] = useState(null);
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  const isMobile = windowDimension <= 640;

  return (
    // <div className="edit">
    <Layout
      // style={{
      //   backgroundColor: "#FAACA8",
      //   backgroundImage: "linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)",
      // }}
      style={{
        backgroundColor: "#003087"
      }}
    >

    
      <HeaderBar />
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "30px",
            marginTop: "80px",
          }}
        >
          {table_name}
        </h1>
      </div>
      <Content>
        {isMobile ? (
          <div
            className="tableContainer"
            style={{ padding: "0 15px", marginBottom: 20 }}
          >
            <BasicTable />
          </div>
        ) : (
          <div
            className="tableContainer"
            style={{ padding: "0 50px", marginBottom: 20 }}
          >
            <BasicTable />
          </div>
        )}
      </Content>
      <Footer style={{ textAlign: "center", opacity: 1 }}>
      </Footer>
    </Layout>
    // </div>
  );
};

export default EditedTable;
