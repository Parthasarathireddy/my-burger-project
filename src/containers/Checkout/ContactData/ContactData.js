import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../Axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType : 'input',
                elemenentConfig : {
                    type : 'text',
                    placeholder : 'Your Name'
                },
                value : ''
            },
            Street: {
                elementType : 'input',
                elemenentConfig : {
                    type : 'text',
                    placeholder : 'Your Street'
                },
                value : ''
            },
            state: {
                elementType : 'input',
                elemenentConfig : {
                    type : 'text',
                    placeholder : 'Your State'
                },
                value : ''
            },
            zipcode: {
                elementType : 'input',
                elemenentConfig : {
                    type : 'text',
                    placeholder : 'Your Zipcode'
                },
                value : ''
            },
            country: {
                elementType : 'input',
                elemenentConfig : {
                    type : 'text',
                    placeholder : 'Your Country'
                },
                value : ''
            },
            email: {
                elementType : 'input',
                elemenentConfig : {
                    type : 'email',
                    placeholder : 'Your E-Mail'
                },
                value : ''
            },
            deliveryMethod: {
                elementType : 'select',
                elemenentConfig : {
                    options : [
                        {value : 'fastest', displayValue : 'Fastest'},
                        {value : 'cheapest', displayValue : 'Cheapest'}
                            ]
                },
                value : ''
            },
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({ loading: true });
        // alert('You Continue!');
        const formData = {};
        for (let formElementidentifier in this.state.orderForm){
            formData[formElementidentifier] = this.state.orderForm[formElementidentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData : formData
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
    inputChangedHandler = (event, inputIdentifier) =>{
        //console.log(event.target.value);
        //spread operator not clone deeply
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm : updatedOrderForm});

    }
    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        let form = (<form onSubmit = {this.orderHandler}>
            {formElementArray.map(formElement =>(
                <Input key = {formElement.id} elementType = {formElement.config.elementType} elemenentConfig = {formElement.config.elemenentConfig} value = {formElement.config.value} changed = {(event) => {this.inputChangedHandler(event, formElement.id)}}/>
            ))}
            <Button btnType="Success">ORDER</Button>
        </form>);
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}
export default ContactData;