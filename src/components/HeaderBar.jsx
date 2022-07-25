import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
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
import autoTable from "jspdf-autotable";

function HeaderBar() {
  // redux
  const dispatch = useDispatch();
  const table_name = useSelector((state) => {
    return state.table_name;
  });
  const columns_state = useSelector((state) => state.columns);
  // determine the screen size
  const [windowDimension, setWindowDimension] = useState(null);
  // popup trigger
  const [addColumnPopup, setAddColumnPopup] = useState(false);
  const [deleteColumnPopup, setDeleteColumnPopup] = useState(false);
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
  const originData = [
    [1, "Tuesday 8/26", "", ""],
    [1, "Thursday 8/31", "", ""],
    [2, "Tuesday 9/2", "", ""],
    [2, "Thursday 9/7", "", ""],
    [3, "Tuesday 9/9", "", ""],
    [3, "Thursday 9/14", "", ""],
    [4, "Tuesday 9/16", "", ""],
    [4, "Thursday 9/21", "", ""],
    [5, "Tuesday 9/23", "", ""],
    [5, "Thursday 9/28", "", ""],
    [6, "Tuesday 9/30", "", ""],
    [6, "Thursday 10/5", "NO CLASS", ""],
  ];
  // combine conlumn and table data
  const export_data = originData.map((data) => {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      const col_name = `${columns_state[i].title}`;
      obj[col_name] = data[i];
    }
    return obj;
  });

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(export_data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `${table_name}`);
    //buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, `${table_name}.xlsx`);
  };

  const dowloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${table_name}`, 20, 10);
    doc.autoTable({
      head: [columns_state.map(col => col.title)],
      body: originData,
    });
    doc.save(`${table_name}.pdf`);
  };

  return (
    <div>
      <Popup trigger={addColumnPopup} setTrigger={setAddColumnPopup}>
        <ColumnForm />
      </Popup>
      <Popup trigger={deleteColumnPopup} setTrigger={setDeleteColumnPopup}>
        <DeleteColumnForm />
      </Popup>
      {isMobile ? (
        // mobile screen
        <MobileNavbar.Wrapper>
          <MobileNavbar.Items>
            <MobileNavbar.Item>
              <Dropdown id={`dropdown-basic`} drop="up">
                <DropdownToggle variant="light">
                  <MobileNavbar.Icon>
                    <Home size={20} />
                  </MobileNavbar.Icon>
                  <br />
                  Style
                </DropdownToggle>
                <DropdownMenu>
                  <Dropdown.Item eventKey="1">Template 1</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Template 2</Dropdown.Item>
                  <Dropdown.Item eventKey="3">
                    Something else here
                  </Dropdown.Item>
                </DropdownMenu>
              </Dropdown>
            </MobileNavbar.Item>
            <Dropdown id={`dropdown-basic`} drop="up">
              <DropdownToggle variant="light">
                <MobileNavbar.Icon>
                  <PlusCircle size={20} />
                </MobileNavbar.Icon>
                <br />
                Edit
              </DropdownToggle>
              <DropdownMenu>
                <Dropdown.Item eventKey="1">Add Column</Dropdown.Item>
                <Dropdown.Item eventKey="2">Add Row</Dropdown.Item>
                <Dropdown.Item eventKey="2">Delete Column</Dropdown.Item>
                <Dropdown.Item eventKey="3">Set Holiday</Dropdown.Item>
              </DropdownMenu>
            </Dropdown>
            <MobileNavbar.Item>
              <Button variant="light">
                <MobileNavbar.Icon>
                  <ExternalLink size={20} />
                </MobileNavbar.Icon>
                Export
              </Button>
            </MobileNavbar.Item>
          </MobileNavbar.Items>
        </MobileNavbar.Wrapper>
      ) : (
        // computer screen
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">
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
                <NavDropdown title="Style">
                  <NavDropdown.Item href="#action/3.1">
                    Template 1
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Template 2
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Edit">
                  <NavDropdown.Item href="#action/3.1">
                    Add Row
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/addColumn"
                    onClick={() => setAddColumnPopup(true)}
                  >
                    Add Column
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/deleteColumn"
                    onClick={() => setDeleteColumnPopup(true)}
                  >
                    Delete Column
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Set Holiday
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Export">
                  <NavDropdown.Item onClick={downloadExcel}>
                    csv
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/addColumn"
                    onClick={dowloadPDF}
                  >
                    pdf
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/deleteColumn"
                    onClick={() => setDeleteColumnPopup(true)}
                  >
                    html
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">xml</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
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
