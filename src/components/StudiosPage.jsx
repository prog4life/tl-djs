import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Field, reduxForm } from 'redux-form'
import { Layout, Row, Col } from 'antd';
import StudiosContainer from 'containers/StudiosContainer';
import StudiosFilterContainer from 'containers/StudiosFilterContainer';
import TestControlsContainer from 'containers/TestControlsContainer'; // TEMP

const { Header, Content, Footer } = Layout;

const StudiosPage = () => (
  // <Layout style={{ minHeight: '100vh' }} >
  <Layout>
    <Header style={{ color: 'grey' }}>
      {'Header Text'}
    </Header>
    <Content style={{ backgroundColor: '#f1f3f6' }}>
      <Row type="flex">
        {/* <Col xs={2} sm={4} md={0} lg={2} xl={2} xxl={2} /> */}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={18}
          xxl={{ span: 18 }}
        >
          <Layout className="studios-layout">
            <StudiosContainer />
          </Layout>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6}>
          <Layout style={{ minHeight: '100%', padding: 32 }}>
            <StudiosFilterContainer />
            <Footer>
              <TestControlsContainer />
            </Footer>
          </Layout>
        </Col>
      </Row>
    </Content>
    {/* <Sider>
    </Sider> */}
  </Layout>
);

export default StudiosPage;
