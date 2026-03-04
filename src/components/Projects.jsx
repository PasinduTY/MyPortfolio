import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import Fade from "react-reveal/Fade";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import ProjectCard from "./projects/ProjectCard";
import UIUXCard from "./uiux/UIUXCard";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  containerStyle: {
    marginBottom: 25,
  },
  showMoreStyle: {
    margin: 25,
  },
};

const Projects = (props) => {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetch(endpoints.projects, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);
  const numberOfItems = showMore && data ? data.projects?.length : 6;
  return (
    <>
      <Header title={header} />
      {data ? (
        <div className="section-content-container">
          {/* Projects Section */}
          <Container style={styles.containerStyle}>
            <h2 style={{ marginBottom: 30, fontWeight: 700 }}>Development</h2>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
              {data.projects?.slice(0, numberOfItems).map((project) => (
                <Fade key={project.title}>
                  <ProjectCard project={project} />
                </Fade>
              ))}
            </Row>

            {!showMore && data.projects?.length > 6 && (
              <Button
                style={styles.showMoreStyle}
                variant={theme.bsSecondaryVariant}
                onClick={() => setShowMore(true)}
              >
                show more
              </Button>
            )}
          </Container>

          {/* UI/UX Section */}
          {data.uiux && data.uiux.length > 0 && (
            <Container style={styles.containerStyle}>
              <h2 style={{ marginBottom: 30, fontWeight: 700 }}>
                UI/UX Designs
              </h2>
              <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {data.uiux.map((design) => (
                  <Fade key={design.title}>
                    <UIUXCard design={design} />
                  </Fade>
                ))}
              </Row>
            </Container>
          )}
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
};

Projects.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Projects;
