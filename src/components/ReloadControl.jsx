import React, { Component, PureComponent } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class ReloadControl extends Component {
  static propTypes = {
    children: PropTypes.string,
    isVisible: PropTypes.bool,
    onReloadClick: PropTypes.func.isRequired,
  }
  static defaultProps = {
    children: 'Reload',
    isVisible: true,
  }
  componentDidUpdate() {
    console.log('ReloadControl update');
  }
  render() {
    const { onReloadClick, isVisible, children } = this.props;

    return isVisible ? (
      <div className="reload-ctrl">
        <Button
          onClick={onReloadClick}
          type="button"
        >
          {children}
        </Button>
      </div>
    ) : null;
  }
}

export default ReloadControl;
