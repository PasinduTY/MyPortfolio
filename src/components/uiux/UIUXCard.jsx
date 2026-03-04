import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

const styles = {
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  buttonStyle: {
    margin: 5,
  },
};

const UIUXCard = (props) => {
  const theme = useContext(ThemeContext);
  const { design } = props;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: theme.cardBackground,
          borderColor: theme.cardBorderColor,
        }}
        text={theme.bsSecondaryVariant}
      >
        <Card.Img variant="top" src={design?.image} />
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{design.title}</Card.Title>
        </Card.Body>

        <Card.Body>
          <Button
            style={styles.buttonStyle}
            variant={'outline-' + theme.bsSecondaryVariant}
            onClick={() => window.open(design.figmaLink, '_blank')}
          >
            View on Figma
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

UIUXCard.propTypes = {
  design: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    figmaLink: PropTypes.string.isRequired,
  }).isRequired,
};

export default UIUXCard;
