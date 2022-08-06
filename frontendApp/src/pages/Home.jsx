import "../App.css";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateForm from "../components/form/CreateForm";
import MobileHome from "../components/home/MobileHome";

function Home() {
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

  // const isMobile = windowDimension <= 640;
  const isMobile = false;

  return (
    <div>
        {isMobile ? (
          <MobileHome />
        ) : (
          <div className="home">
          <MainContainer>
            <FormHeader title="Course Scheduler" />
            <CreateForm />
          </MainContainer>
          </div>
        )}
      
    </div>
  );
}

export default Home;

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const MainContainer = styled.div`
  display: flex;
  margin-top: 50px;
  margin-bottom: auto;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 15px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  overflow: auto;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 70vw;
    height: 80vh;
    display: flex;
  }
  @media only screen and (min-width: 1024px) {
    width: 40vw;
    height: 90vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 40vw;
    height: 90vh;
  }
`;
