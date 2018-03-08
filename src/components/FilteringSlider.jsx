import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

class FilteringSlider extends PureComponent {
  state = {
    lowest: null,
    highest: null,
  }
  componentWillReceiveProps(nextProps) {
    const { lowest, highest } = this.state;
    const [baseMin, baseMax] = nextProps.baseRange;

    // if (lowest < baseMin || lowest > baseMax) {
    //   this.setState({ lowest: null });
    // }
    // if (highest < baseMin || highest > baseMax) {
    //   this.setState({ highest: null });
    // }
    this.setState((prevState) => {
      const { lowest, highest } = prevState;
      if (lowest < baseMin || lowest > baseMax) {
        return { lowest: null };
      }
      if (highest < baseMin || highest > baseMax) {
        return { highest: null };
      }
      return { ...prevState };
    });
    console.log('is props the same: ', this.props === nextProps);
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
    const { baseRange: [baseMin, baseMax], step } = this.props;
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
              {lowest && lowest > baseMin && lowest < baseMax
                ? lowest
                : baseMin
              }
            </span>
            <span style={{ padding: '0 10px' }}>
              {' - '}
            </span>
            <span>
              {highest && highest > baseMin && highest < baseMax
                ? highest
                : baseMax
              }
            </span>
          </div>
        </div>
        <Slider
          defaultValue={[baseMin, baseMax]}
          max={baseMax}
          min={baseMin}
          onAfterChange={this.handleAfterChange}
          range
          step={step}
          // onChange={onChange}
        />
      </div>
    );
  }
}

FilteringSlider.propTypes = {
  baseRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  onAfterChange: PropTypes.func.isRequired,
  step: PropTypes.number,
};

FilteringSlider.defaultProps = {
  // baseRange: [0, 10000],
  step: 100,
};

export default FilteringSlider;

// const FilteringSlider = ({
//   onAfterChange, baseRange: [baseMin, baseMax], lowest, highest,
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
//           {lowest || baseMin}
//         </span>
//         <span style={{ padding: '0 10px' }}>
//           {' - '}
//         </span>
//         <span>
//           {highest || baseMax}
//         </span>
//       </div>
//     </div>
//     <Slider
//       defaultValue={[baseMin, baseMax]}
//       max={baseMax}
//       min={baseMin}
//       onAfterChange={onAfterChange}
//       range
//       step={100}
//       // onChange={onChange}
//       // value={[min, max]}
//     />
//   </div>
// );
