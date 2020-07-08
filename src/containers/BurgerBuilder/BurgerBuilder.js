import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BUildControls/BuildControls';
import Aux from '../../hoc/Auxilary';

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        ingredients :{
            salad : 0,
            bacon : 0,
            cheese : 0,
            meat : 0
        }
    }
    render(){
        return(
            <Aux>
                <Burger ingredients  = {this.state.ingredients}/>
                <div>
                     <BuildControls/>
                </div>
            </Aux>
        );
    }
}
export default BurgerBuilder;