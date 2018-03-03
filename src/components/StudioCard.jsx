import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const { Meta } = Card;

const StudioCard = ({ id, name, price, view: [imgSrc] }) => (
  <Card
    className="studio-card"
    cover={<img alt={`Студия ${name || ''}`} src={imgSrc} height="260" />}
    hoverable
    // style={{ width: 382 }}
  >
    <Meta
      title={`Студия ${name || ''}`}
      // description="www.whatever.com"
    />
  </Card>
);

StudioCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  view: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default StudioCard;
