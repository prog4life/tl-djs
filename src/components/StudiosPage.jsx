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
    <Layout> {/* style={{ backgroundColor: '#f1f3f6' }} */}
      <Row type="flex">
        {/* <Col xs={2} sm={4} md={0} lg={2} xl={2} xxl={2} /> */}
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 24, order: 2 }}
          xl={{ span: 16, order: 1 }}
          xxl={{ span: 18, order: 1 }}
        >
          <Layout className="studios-layout">
            <StudiosContainer />
          </Layout>
        </Col>
        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 24, order: 1 }}
          xl={{ span: 8, order: 2 }}
          xxl={{ span: 6, order: 2 }}
        >
          <Layout className="filter-layout">
            <StudiosFilterContainer />
            <TestControlsContainer />
          </Layout>
        </Col>
      </Row>
    </Layout>
    {/* <Sider>
    </Sider> */}
  </Layout>
);

export default StudiosPage;
