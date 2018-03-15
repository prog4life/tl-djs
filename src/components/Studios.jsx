import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Field, reduxForm } from 'redux-form'
import { Layout, Row, Col, Spin } from 'antd';
import StudioCard from 'components/StudioCard';

const { Content } = Layout;

class Studios extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    loadStudios: PropTypes.func.isRequired,
    studios: PropTypes.arrayOf(PropTypes.object).isRequired,
  }
  // TEMP remove later. usually must be placed to container
  handleLoadClick = () => {
    const { loadStudios } = this.props;
    loadStudios();
  }
  placeholderStyle = {
    borderRadius: '50%',
    background: 'lightgrey',
    color: 'black',
    margin: '0 auto',
    textAlign: 'center',
    width: '1.6em',
  }
  renderPlaceholder = isLoading => (
    isLoading
      ? <Spin size="large" tip="Loading..." />
      : (
        <Fragment>
          <p style={this.placeholderStyle}>
            {':Þ'}
          </p>
          {/* <span style={{ color: 'darkgrey' }}>
            {`Loading: ${isLoading}`}
          </span> */}
        </Fragment>
      )
  )
  renderStudios = studios => (
    <div className="studios">
      <Row
        gutter={{ xs: 16, sm: 16, md: 16, lg: 24 }}
        justify="space-between"
        type="flex"
      >
        {studios && studios.map(studio => (
          <Col
            key={studio.id}
            xs={24}
            sm={24}
            md={24}
            lg={12}
            xl={12}
            xxl={8}
          >
            <StudioCard {...studio} /> {/* OR {studio} */}
          </Col>
        ))
        }
      </Row>
      {/* // <List
      //   dataSource={studios}
      //   grid={{
      //     gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3
      //   }}
      //   loading={isLoading && !studios.length}
      //   renderItem={studio => (
      //     <List.Item>
      //       <StudioCard {...studio} />
      //     </List.Item>
      //   )}
      // /> */}
    </div>
  )
  render() {
    const {
      studios,
      isLoading,
    } = this.props;

    return (
      <Fragment>
        <button
          onClick={this.handleLoadClick}
          style={{
            margin: '0 10px',
            height: '10px',
            width: '20px',
            position: 'absolute',
            top: '5px',
            right: '10px',
          }}
          type="button"
        >
          {'LOAD'}
        </button>
        {isLoading || !studios.length
          ?
            <Layout>
              {this.renderPlaceholder(isLoading)}
            </Layout>
          :
            <Layout className="studios-layout">
              {this.renderStudios(studios)}
            </Layout>
        }
      </Fragment>
    );
  }
}

export default Studios;
