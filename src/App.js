import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
class App extends Component {
  //Checking Purposs we added this 
  // state = {
  //   show : true
  // }
  // componentDidMount(){
  //   setTimeout(()=> {
  //     this.setState({show: false});
  //   },5000);
  // }
  render() {
    return (
      <div>
        <Layout>
         {/* {this.state.show ? <BurgerBuilder /> : null } */}
          <BurgerBuilder /> 
        </Layout>
      </div>
    );
  }
}

export default App;
