import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Field, reduxForm } from 'redux-form'
import { Layout, List, Row, Col } from 'antd';
import StudioCard from 'components/StudioCard';
import StudiosFilterContainer from 'containers/StudiosFilterContainer';

const { Header, Sider, Content } = Layout;

class Studios extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    loadStudios: PropTypes.func.isRequired,
    studios: PropTypes.instanceOf(Object).isRequired
  }
  componentDidMount() {
    const { loadStudios } = this.props;
    loadStudios();
  }
  handleLoadClick = () => {
    const { loadStudios } = this.props;
    loadStudios();
  }
  render() {
    const {
      studios,
      isLoading
    } = this.props;

    return (
      <Layout style={{ minHeight: '100vh' }} >
        <Header style={{ color: 'grey' }}>
          {'Header Text'}
        </Header>
        <Layout>
          <Content>
            <Row>
              <Col span={18}>
                <div className="studios">
                  <button onClick={this.handleLoadClick} type="button" >
                    {'LOAD'}
                  </button>
                  <h4>
                    {`Loading: ${isLoading}`}
                  </h4>
                  <List
                    dataSource={studios}
                    grid={{ gutter: 20, xs: 1, sm: 2, md: 3, lg: 3 }}
                    loading={isLoading}
                    renderItem={item => (
                      <List.Item>
                        {/* <StudioCard key={item.id} {...item} /> */}
                        <StudioCard {...item} />
                      </List.Item>
                    )}
                  />
                  {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {studios && studios.map(studio => (
                      <Col key={studio.id} span={8}>
                        <StudioCard {...studio} />
                      </Col>
                    ))}
                  </Row> */}
                </div>
              </Col>
              <Col span={6}>
                <Layout style={{ minHeight: '100%', padding: 32 }}>
                  <StudiosFilterContainer />
                </Layout>
              </Col>
            </Row>
          </Content>
          {/* <Sider>
          </Sider> */}
        </Layout>
      </Layout>
    );
  }
}

export default Studios;
