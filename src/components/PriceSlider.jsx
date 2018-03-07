import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

class PriceSlider extends Component {
  state = {
    lowest: null,
    highest: null,
  }
  handleAfterChange = (value) => {
    const { onAfterChange } = this.props;
    this.setState({
      lowest: value[0],
      highest: value[1],
    });
    onAfterChange(value);
  }
  render() {
    const { initial: [minInitial, maxInitial] } = this.props;
    const { lowest, highest } = this.state;
    return (
      <div style={{
        backgroundColor: '#fff',
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
            {/* TODO: check if range is updated with PureComponent
                reset slider local state on new initialRange props */}
            <span>
              {lowest && lowest > minInitial && lowest < maxInitial
                ? lowest
                : minInitial
              }
            </span>
            <span style={{ padding: '0 10px' }}>
              {' - '}
            </span>
            <span>
              {highest && highest > minInitial && highest < maxInitial
                ? highest
                : maxInitial
              }
            </span>
          </div>
        </div>
        <Slider
          defaultValue={[minInitial, maxInitial]}
          max={maxInitial}
          min={minInitial}
          onAfterChange={this.handleAfterChange}
          range
          step={100}
          // onChange={onChange}
        />
      </div>
    );
  }
}

PriceSlider.propTypes = {
  initial: PropTypes.arrayOf(PropTypes.number),
  onAfterChange: PropTypes.func.isRequired,
};

PriceSlider.defaultProps = {
  initial: [0, 10000],
};

export default PriceSlider;

// const PriceSlider = ({
//   onAfterChange, initial: [minInitial, maxInitial], lowest, highest,
// }) => (
//   <div style={{
//     backgroundColor: '#fff',
//     // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
//     border: '1px solid #e8e8e8',
//     borderRadius: 2,
//     borderColor: 'rgba(0, 0, 0, 0.09)',
//     padding: 16,
//   }}
//   >
//     <div style={{
//       display: 'flex',
//       justifyContent: 'space-between',
//     }}
//     >
//       <header>
//         {'Стоимость'}
//       </header>
//       <div>
//         <span>
//           {lowest || minInitial}
//         </span>
//         <span style={{ padding: '0 10px' }}>
//           {' - '}
//         </span>
//         <span>
//           {highest || maxInitial}
//         </span>
//       </div>
//     </div>
//     <Slider
//       defaultValue={[minInitial, maxInitial]}
//       max={maxInitial}
//       min={minInitial}
//       onAfterChange={onAfterChange}
//       range
//       step={100}
//       // onChange={onChange}
//       // value={[min, max]}
//     />
//   </div>
// );
