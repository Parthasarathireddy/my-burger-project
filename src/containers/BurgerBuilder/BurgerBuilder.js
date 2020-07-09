import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BUildControls/BuildControls';
import Aux from '../../hoc/Auxilary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}
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
        },
        totalPrice : 4,
        purchasable : false
    }
    updatePurchaseState(ingredients){
        //const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable : sum>0})
    }
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice,ingredients : updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = updateCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice,ingredients : updateIngredients});
        this.updatePurchaseState(updateIngredients);
    }
    render(){
        const disableInfo = {...this.state.ingredients}
        for(let key in disableInfo){
            disableInfo[key] =disableInfo[key] <= 0
        }
        return(
            <Aux>
                <Burger ingredients  = {this.state.ingredients}/>
                <div>
                     <BuildControls 
                     ingredientAdded = {this.addIngredientHandler}
                     ingredientRemoved = {this.removeIngredientHandler}
                     disabled = {disableInfo}
                     purchasable = {this.state.purchasable}
                     price = {this.state.totalPrice}/>
                </div>
            </Aux>
        );
    }
}
export default BurgerBuilder;