import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Home, PlusCircle, ExternalLink } from "react-feather";

function HeaderBar() {
  // determine the screen size
  const [windowDimension, setWindowDimension] = useState(null);

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

  return (
    <div>
      {isMobile ? (
        <MobileNavbar.Wrapper>
          <MobileNavbar.Items>
            <MobileNavbar.Item>
              <MobileNavbar.Icon>
                <Home size={20} />
              </MobileNavbar.Icon>
              Style
            </MobileNavbar.Item>
            <MobileNavbar.Item>
              <MobileNavbar.Icon>
                <PlusCircle size={20} />
              </MobileNavbar.Icon>
              Add
            </MobileNavbar.Item>
            <MobileNavbar.Item>
              <MobileNavbar.Icon>
                <ExternalLink size={20} />
              </MobileNavbar.Icon>
              Export
            </MobileNavbar.Item>
          </MobileNavbar.Items>
        </MobileNavbar.Wrapper>
      ) : (
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
                <NavDropdown title="Add">
                  <NavDropdown.Item href="#action/3.1">
                    Add Row
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Add Column
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Set Holiday
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#export">Export</Nav.Link>
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
