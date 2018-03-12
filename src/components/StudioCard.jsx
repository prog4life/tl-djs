import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
// import CardExtra from 'components/CardExtra';

const { Meta } = Card;

const StudioCard = ({ id, name, price, view: [imgSrc] }) => (
  <Card
    className="studio-card"
    cover={<img alt={`Студия ${name || ''}`} src={imgSrc} height="260" />}
    // extra={CardExtra}
    hoverable
    // style={{ width: 382 }}
  >
    {/* <div style={{ position: 'relative' }}> */}
    <div style={{
        position: 'absolute',
        background: '#2f65eb',
        borderRadius: '3px 0 0 3px',
        width: '23%',
        right: 0,
        bottom: '80%',
        textAlign: 'center',
        color: 'white'
      }}
    >
      {`${price} р.`}
    </div>
    {/* </div> */}
    <Meta
      title={`Студия ${name || ''}`}
      // description="www.whatever.com"
    />
  </Card>
);

StudioCard.propTypes = {
  extra: PropTypes.element.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  view: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default StudioCard;
