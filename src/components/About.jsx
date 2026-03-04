import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import Fade from "react-reveal";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: "column",
    whiteSpace: "pre-wrap",
    textAlign: "center",
    fontSize: "1.2em",
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    marginTop: "-150px",
    marginBottom: "50px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  profileImage: {
    width: "350px",
    height: "350px",
    objectFit: "cover",
    borderRadius: "50%",
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => <ReactMarkdown children={text} />;

  useEffect(() => {
    fetch(endpoints.about, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Fade>
              <Row>
                <Col style={styles.introImageContainer}>
                  <img
                    src={data?.imageSource}
                    alt="profile"
                    style={styles.profileImage}
                  />
                </Col>
              </Row>
              <Row>
                <Col style={styles.introTextContainer}>
                  {parseIntro(data.about)}
                </Col>
              </Row>
            </Fade>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
