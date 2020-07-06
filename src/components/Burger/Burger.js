import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
const burger = (props)=>{
    //very Useful code Javascript array functions like Map and reduce
        let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) =>{
               return <BurgerIngredient key = {igKey+ i} type = {igKey} />;
            })
        })
        .reduce((prevArr, currentEl) => {
           return prevArr.concat(currentEl);
        }, []);
        console.log(transformIngredients);
        if(transformIngredients.length === 0){
            transformIngredients = <p>Plese start adding Ingredients</p>
        }
        return (
    <div className = {classes.Burger}>
        <BurgerIngredient  type = "bread-top"/>
        {transformIngredients}
        <BurgerIngredient  type = "bread-bottom"/>
    </div>
    );
}
export default burger;