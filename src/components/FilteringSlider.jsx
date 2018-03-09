import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import _throttle from 'lodash.throttle';
import { Slider } from 'antd';

class FilteringSlider extends PureComponent {
  state = {
    lowest: null,
    highest: null,
  }
  componentWillReceiveProps(nextProps) {
    console.log('is props the same: ', this.props === nextProps);

    if (this.props === nextProps) {
      return;
    }
    const [baseMin, baseMax] = nextProps.baseRange;

    this.setState((prevState) => {
      const { lowest, highest } = prevState;
      const nextState = { lowest, highest };

      if (!lowest || lowest < baseMin || lowest > baseMax) {
        nextState.lowest = baseMin;
      }
      if (!highest || highest < baseMin || highest > baseMax) {
        nextState.highest = baseMax;
      }
      if (lowest !== nextState.lowest || highest !== nextState.highest) {
        return nextState;
      }
      return null;
    });
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('cdu prevState ', prevState);
    console.log('cdu prevProps === this.props ', prevProps === this.props);
    const now = Date.now();
    console.log('cdu checkpoint', now - this.checkPointCDU);
    this.checkPointCDU = now;
  }
  onChangeThrottled = _throttle(this.props.onChange, 500, { leading: false });
  checkPoint = Date.now()
  checkPointCDU = Date.now()
  handleChange = (value) => {
    const now = Date.now();
    console.log('onchange value and time ', value, now - this.checkPoint);
    this.checkPoint = now;

    this.setState({
      lowest: value[0],
      highest: value[1],
    });
    this.onChangeThrottled(value);
  }
  render() {
    const { baseRange: [baseMin, baseMax], step } = this.props;
    const { lowest, highest } = this.state;
    const nextLowest = lowest || baseMin;
    const nextHighest = highest || baseMax;

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
            <span>
              {nextLowest}
            </span>
            <span style={{ padding: '0 10px' }}>
              {' - '}
            </span>
            <span>
              {nextHighest}
            </span>
          </div>
        </div>
        <Slider
          defaultValue={[baseMin, baseMax]}
          max={baseMax}
          min={baseMin}
          onChange={this.handleChange}
          range
          step={step}
          value={[nextLowest, nextHighest]}
        />
      </div>
    );
  }
}

FilteringSlider.propTypes = {
  baseRange: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
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
