import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavLink from "react-bootstrap/esm/NavLink";
import Dropdown from "react-bootstrap/Dropdown";
import { Home, PlusCircle, ExternalLink } from "react-feather";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import Popup from "./Popup";
import ColumnForm from "./ColumnForm";
import DeleteColumnForm from "./DeleteColumnForm";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as ReactDOMServer from "react-dom/server";
import { saveAs } from "file-saver";
import RowForm from "./RowForm";
import "../../App.css";
// import { NavLink } from "react-router-dom";

function HeaderBar() {
  // redux
  const dispatch = useDispatch();
  const table_name = useSelector((state) => {
    return state.table_name;
  });
  const table_data = useSelector((state) => {
    return state.data;
  });
  const table_year = useSelector((state) => {
    return state.selected_year;
  });
  const columns_state = useSelector((state) => state.columns);
  // determine the screen size
  const [windowDimension, setWindowDimension] = useState(null);
  // popup trigger
  const [addColumnPopup, setAddColumnPopup] = useState(false);
  const [deleteColumnPopup, setDeleteColumnPopup] = useState(false);
  const [addRowPopup, setAddRowPopup] = useState(false);
  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  // icon for header bart
  const navDropdownIcon = <i className="bi bi-plus-circle"></i>;
  const navExportIcon = <i className="bi bi-box-arrow-up"></i>;

  // dowload functions
  const export_data = table_data.map(({ key, timestamp, ...res }) => ({
    ...res,
  }));

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(export_data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${table_name}`);
    //buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, `${table_name}.csv`);
  };

  /**
   * Prepare data for downloadPDF and downloadHTML
   * -> convert columns object => column_titles array
   * -> convert table data object => data array(same order to the columns)
   */
  const col_title_arr = columns_state.map((col) => col.title);
  const table_data_arr = [];
  export_data.forEach((element) => {
    let row = [];
    col_title_arr.forEach((col_title) => {
      row.push(element[col_title]);
    });
    table_data_arr.push(row);
  });

  const dowloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${table_year} ${table_name}`, 20, 10);
    doc.autoTable({
      head: [col_title_arr],
      body: table_data_arr,
    });
    doc.save(`${table_name}.pdf`);
  };

  const downloadHTML = () => {
    const table = (
      <div>
        <h1>
          {table_year} {table_name}
        </h1>
        <table>
          <tbody>
            <tr>
              {col_title_arr.map((col_name, idx) => (
                <th key={idx}>{col_name}</th>
              ))}
            </tr>
            {table_data_arr.map((rowData, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {rowData.map((cellData) => (
                    <td>{cellData}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

    // convert react JSX object to HTML
    const html = ReactDOMServer.renderToStaticMarkup(table);
    let file = new File([html], "tes.html", {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file);
  };

  const DropDownTitleFontStyle = isMobile
    ? "dropdownTitleFontMobile"
    : "dropdownTitleFontPC";
  const DropDownItemFontStyle = isMobile
    ? "dropdownItemFontMobile"
    : "dropdownItemFontPC";

  return (
    <div>
      <ColumnForm trigger={addColumnPopup} setTrigger={setAddColumnPopup} />
      <DeleteColumnForm
        trigger={deleteColumnPopup}
        setTrigger={setDeleteColumnPopup}
      />
      <Popup trigger={addRowPopup} setTrigger={setAddRowPopup}>
        <RowForm />
      </Popup>
      {/* narvbar */}
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://sustainability.ncsu.edu/multisite/wp-content/uploads/2019/02/Duke-Logo-400x300.png"
              height="40"
              alt="Duke Logo"
              loading="lazy"
            />
            Course Scheduler
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto"></Nav>
            <Nav>
              {/* <NavDropdown title="Style" className={DropDownTitleFontStyle}>
              <NavDropdown.Item href="#action/3.1">Template 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Template 2</NavDropdown.Item>
            </NavDropdown> */}
              <NavLink
                className={DropDownTitleFontStyle}
                href="#addColumn"
                onClick={() => setAddColumnPopup(true)}
              >
                Add Row
              </NavLink>
              {/* <NavDropdown title="Edit" className={DropDownTitleFontStyle}>
                <NavDropdown.Item
                  href="#action/addRow"
                  onClick={() => setAddRowPopup(true)}
                >
                  <div className={DropDownItemFontStyle}>Add Row</div>
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/addColumn"
                  onClick={() => setAddColumnPopup(true)}
                >
                  <div className={DropDownItemFontStyle}>Add Column</div>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="#action/deleteColumn"
                  onClick={() => setDeleteColumnPopup(true)}
                >
                  <div className={DropDownItemFontStyle}>Delete Column</div>
                </NavDropdown.Item>
              </NavDropdown> */}
              <NavDropdown title="Export" className={DropDownTitleFontStyle}>
                <NavDropdown.Item
                  href="#action/downloadCVS"
                  onClick={downloadExcel}
                >
                  {" "}
                  <div className={DropDownItemFontStyle}>CSV</div>
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/downloadPDF"
                  onClick={dowloadPDF}
                >
                  <div className={DropDownItemFontStyle}>PDF </div>
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action/downloadHTML"
                  onClick={downloadHTML}
                >
                  <div className={DropDownItemFontStyle}>HTML</div>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

const NavbarStyle = {
  Wrapper: styled.nav`
    flex: 1;

    align-self: flex-start;

    padding: 1rem 3rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
  `,
  Logo: styled.h1`
    border: 1px solid gray;
    padding: 0.5rem 1rem;
  `,
  Items: styled.ul`
    display: flex;
    list-style: none;
  `,
  Item: styled.li`
    padding: 0 1rem;
    cursor: pointer;
  `,
};

const MobileNavbar = {
  Wrapper: styled(NavbarStyle.Wrapper)`
    position: fixed;
    width: 100vw;
    bottom: 0;
    height: 25vw;
    justify-content: center;
  `,
  Items: styled(NavbarStyle.Items)`
    flex: 1;
    padding: 0 2rem;
    justify-content: space-around;
  `,
  Item: styled(NavbarStyle.Item)`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.2rem;
  `,
  Icon: styled.span``,
};

export default HeaderBar;
