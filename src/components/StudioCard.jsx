import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
// import CardExtra from 'components/CardExtra';

const { Meta } = Card;

const StudioCard = ({ name, price, view: [imgSrc] }) => (
  <div className="studio-card">
    <Card
      cover={<img
        className="studio-card__cover"
        alt={`Студия ${name || ''}`}
        src={imgSrc}
      />}
      hoverable
    >
      <div className="price-label">
        {`${price} р.`}
      </div>
      <Meta
        title={name || ''}
        // description="www.whatever.com"
      />
    </Card>
  </div>
);

StudioCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  view: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StudioCard;
