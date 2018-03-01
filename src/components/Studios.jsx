import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

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
    const { studios, isLoading } = this.props;

    return (
      <Layout>
        <Header>

        </Header>
      </Layout>
      // <div className="studios container">
      //   <h3>
      //     {'Studios Page'}
      //   </h3>
      //   <button onClick={this.handleLoadClick} type="button" >
      //     {'LOAD'}
      //   </button>
      //   <h4>
      //     {`Loading: ${isLoading}`}
      //   </h4>
      //   {studios && studios.map(({ id, name, price, view: [imgSrc] }) => (
      //     <div key={id} className="studio-card" >
      //       <header>
      //         <span>
      //           {name}
      //         </span>
      //         {': '}
      //         <span>
      //           {price}
      //         </span>
      //       </header>
      //       <img
      //         alt={`Студия ${name}`}
      //         height="200px"
      //         src={imgSrc}
      //         // width="200px"
      //       />
      //     </div>
      //   ))}
      // </div>
    );
  }
}

export default Studios;

// const Studios = ({ studios }) => (
//   <div>
//     {'Studios Page'}
//     {studios.map(({ id, name, price, view: [imgSrc] }) => (
//       <div className="studio-card" key={id} >
//         <img alt={`Студия ${name}`} height="200px" src={imgSrc} width="200px" />
//         <span>{name}</span>
//         {': '}
//         <span>{price}</span>
//       </div>
//     ))}
//   </div>
// );
