import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BUildControls/BuildControls';
import Aux from '../../hoc/Auxilary/Auxilary';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-orders';

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
        purchasable : false,
        purchasing : false
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
    purchasingHandler = () =>{
        this.setState({purchasing : true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing : false});
    }
    purchaseContinueHandler = () =>{
       // alert('You Continue!');
       const order = {
           ingredients : this.state.ingredients,
           price : this.state.totalPrice,
           Customer : {
               name : 'Partha',
               address : {
                   Street : 'Bachupalli',
                    state : 'Telangana',
                    zipcode  : '500090'
               },
            email : 'me@me.com'
           },
           deliveryMethod :'fastest'
       }
       axios.post('/orders.json', order).then(response =>{
            console.log(response);
       }).catch( error =>{
           console.log(error);
       });
    }
    render(){
        const disableInfo = {...this.state.ingredients}
        for(let key in disableInfo){
            disableInfo[key] =disableInfo[key] <= 0
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients = {this.state.ingredients}
                    price = {this.state.totalPrice}
                    purchaseCancelled = {this.purchaseCancelHandler}
                    purchaseContinue = {this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients  = {this.state.ingredients}/>
                <div>
                     <BuildControls 
                     ingredientAdded = {this.addIngredientHandler}
                     ingredientRemoved = {this.removeIngredientHandler}
                     disabled = {disableInfo}
                     purchasable = {this.state.purchasable}
                     ordered = {this.purchasingHandler}
                     price = {this.state.totalPrice}/>
                </div>
            </Aux>
        );
    }
}
export default BurgerBuilder;