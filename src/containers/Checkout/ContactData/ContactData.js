import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../Axios-orders';
class ContactData extends Component{
    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading : false,
        totalPrice : 4
    }
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({ loading: true });
        // alert('You Continue!');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            Customer: {
                name: 'Partha',
                address: {
                    Street: 'Bachupalli',
                    state: 'Telangana',
                    zipcode: '500090'
                },
                email: 'me@me.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            this.setState({ loading: false });
            console.log(error);
        });
    }
    render(){
        let form = ( <form>
            <input className = {classes.Input} type ='text' name = "name" placeholder = "Enter your Name" />
            <input className = {classes.Input} type ='email' name = "email" placeholder = "Enter your Email" />
            <input className = {classes.Input} type ='text' name = "street" placeholder = "Enter your Street" />
            <input className = {classes.Input} type ='text' name = "postal" placeholder = "Enter Postal Code" />
            <Button btnType = "Success" clicked = {this.orderHandler}>ORDER</Button>
        </form>);
        if(this.state.loading){
            form  = <Spinner />
        }

        return (
            <div className = {classes.ContactData}>
                <h4>Enter your contact data</h4>
               {form}
            </div>
        );
    }
}
export default ContactData;