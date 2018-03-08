import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Slider } from 'antd';

class FilteringSlider extends PureComponent {
  state = {
    lowest: null,
    highest: null,
  }
  componentWillReceiveProps(nextProps) {
    console.log('is props the same: ', this.props === nextProps);

    // if (this.props === nextProps) {
    //   return;
    // }
    // const [baseMin, baseMax] = nextProps.baseRange;

    // this.setState((prevState) => {
    //   const { lowest, highest } = prevState;
    //   let nextLowest = lowest;
    //   let nextHighest = highest;

    //   if (lowest && (lowest < baseMin || lowest > baseMax)) {
    //     nextLowest = null;
    //   }
    //   if (highest && (highest < baseMin || highest > baseMax)) {
    //     nextHighest = null;
    //   }
    //   if (lowest !== nextLowest || highest !== nextHighest) {
    //     return { lowest: nextLowest, highest: nextHighest };
    //   }
    //   return null;
    // });
  }
  // handleAfterChange = (value) => {
  //   const { onAfterChange } = this.props;
  //   this.setState({
  //     lowest: value[0],
  //     highest: value[1],
  //   });
  //   onAfterChange(value);
  // }
  handleChange = (value) => {
    console.log('onchange value ', value);
    const { onChange } = this.props;
    this.setState({
      lowest: value[0],
      highest: value[1],
    });
    onChange(value);
  }
  // TODO: try avoid creating of new array somehow, maybe use setState, 
  // replace to componentWillReceiveProps
  countRange = (lowest, highest, baseMin, baseMax) => {
    let nextLowest = baseMin;
    let nextHighest = baseMax;

    if (lowest && lowest > baseMin && lowest < baseMax) {
      nextLowest = lowest;
    }
    if (highest && highest > baseMin && highest < baseMax) {
      nextHighest = highest;
    }
    return [nextLowest, nextHighest];
  }
  render() {
    const { baseRange: [baseMin, baseMax], step } = this.props;
    const { lowest, highest } = this.state;
    const nextRange = this.countRange(lowest, highest, baseMin, baseMax);

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
                reset slider local state on new baseRange props */}
            <span>
              {nextRange[0]}
            </span>
            <span style={{ padding: '0 10px' }}>
              {' - '}
            </span>
            <span>
              {nextRange[1]}
            </span>
          </div>
        </div>
        <Slider
          defaultValue={[baseMin, baseMax]}
          max={baseMax}
          min={baseMin}
          // onAfterChange={this.handleAfterChange}
          onChange={this.handleChange}
          range
          step={step}
          value={nextRange}
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
