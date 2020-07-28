import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BUildControls/BuildControls';
import Aux from '../../hoc/Auxilary/Auxilary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
        ingredients :null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }
    componentDidMount () {
        axios.get('https://react-my-burger-d0ca1.firebaseio.com/ingredients.json')
        .then(response =>{
            this.setState({ingredients : response.data});
        }).catch(error =>{
            this.setState({error : true})
        })
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
    //     this.setState({loading : true});
    //    // alert('You Continue!');
    //    const order = {
    //        ingredients : this.state.ingredients,
    //        price : this.state.totalPrice,
    //        Customer : {
    //            name : 'Partha',
    //            address : {
    //                Street : 'Bachupalli',
    //                 state : 'Telangana',
    //                 zipcode  : '500090'
    //            },
    //         email : 'me@me.com'
    //        },
    //        deliveryMethod :'fastest'
    //    }
    //    axios.post('/orders.json', order).then(response =>{
    //        console.log(response);
    //         this.setState({loading : false , purchasing: false});
    //    }).catch( error =>{
    //     this.setState({loading : false, purchasing: false});
    //        console.log(error);
    //    });
    const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
    const queryString = queryParams.join('&');

    this.props.history.push({
        pathname : '/checkout',
        search : '?' + queryString
    }
    );
    }
    render(){
        const disableInfo = {...this.state.ingredients}
        for(let key in disableInfo){
            disableInfo[key] =disableInfo[key] <= 0
        }
        let orderSummary =  null;
        let burger = this.state.error ? <p>Ingredients are can't ne loaded..</p> :<Spinner />
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <div>
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disableInfo}
                            purchasable={this.state.purchasable}
                            ordered={this.purchasingHandler}
                            price={this.state.totalPrice} />
                    </div>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            price = {this.state.totalPrice}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinue = {this.purchaseContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);