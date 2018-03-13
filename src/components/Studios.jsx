import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Field, reduxForm } from 'redux-form'
import { Layout, List, Row, Col } from 'antd';
import StudioCard from 'components/StudioCard';
import StudiosFilterContainer from 'containers/StudiosFilterContainer';

const { Header, Content } = Layout;

class Studios extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    loadStudios: PropTypes.func.isRequired,
    studios: PropTypes.arrayOf(PropTypes.object).isRequired
  }
  componentDidMount() {
    const { loadStudios } = this.props;
    loadStudios();
  }
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
      ? <p style={{ textAlign: 'center' }}>I will be a spinner someday</p>
      : <p style={this.placeholderStyle}>:Þ</p>
  )
  render() {
    const {
      studios,
      isLoading
    } = this.props;

    return (
      // <Layout style={{ minHeight: '100vh' }} >
      <Layout>
        <Header style={{ color: 'grey' }}>
          {'Header Text'}
          <button
            onClick={this.handleLoadClick}
            style={{ margin: '0 10px' }}
            type="button"
          >
            {'LOAD'}
          </button>
          <span style={{ color: 'darkgrey' }}>
            {`Loading: ${isLoading && !studios.length}`}
          </span>
        </Header>
        <Content style={{ backgroundColor: '#f1f3f6' }}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={18}>
              <div className="studios">
                {/* <List
                  dataSource={studios}
                  grid={{
                    gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 3
                  }}
                  loading={isLoading && !studios.length}
                  renderItem={studio => (
                    <List.Item>
                      <StudioCard {...studio} />
                    </List.Item>
                  )}
                /> */}
                {isLoading || !studios.length
                  ? this.renderPlaceholder(isLoading)
                  :
                  <Row
                    gutter={{ xs: 16, sm: 16, md: 16, lg: 24 }}
                    justify="start"
                    type="flex"
                  >
                    {studios && studios.map(studio => (
                      <Col key={studio.id}>
                        <StudioCard {...studio} /> {/* OR {studio} */}
                      </Col>
                    ))}
                  </Row>
                }
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={6}>
              <Layout style={{ minHeight: '100%', padding: 32 }}>
                <StudiosFilterContainer />
              </Layout>
            </Col>
          </Row>
        </Content>
        {/* <Sider>
        </Sider> */}
      </Layout>
    );
  }
}

export default Studios;
