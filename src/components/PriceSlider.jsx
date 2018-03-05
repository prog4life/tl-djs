import React from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

const PriceSlider = props => (
  <div style={{
    backgroundColor: '#fff',
    // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
    border: '1px solid #e8e8e8',
    borderRadius: 2,
    borderColor: 'rgba(0, 0, 0, 0.09)',
    padding: 16,
  }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
    }}
    >
      <header>
        {'Стоимость'}
      </header>
      <div>
        <span>
          {'1000'}
        </span>
        <span style={{ padding: '0 10px' }}>
          {' - '}
        </span>
        <span>
          {'12000'}
        </span>
      </div>
    </div>
    <Slider
      defaultValue={[1000, 12000]}
      max={15000}
      min={0}
      range
      step={100}
      // onChange={onChange}
      // onAfterChange={onAfterChange}
    />
  </div>
);

export default PriceSlider;
