import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        }
        // in latest versions componetWillMount not support anymore instead we use constructor
        componentWillMount() {
            this.requestInterceptors = axios.interceptors.request.use(req =>{
                this.setState({error : null});
                return req;
            })
            this.responseInterceptors = axios.interceptors.response.use(res => res, error =>{
                this.setState({error : error});
            })
        }
        componentWillUnmount (){
            console.log('Component will unmount' , this.requestInterceptors ,  this.responseInterceptors)
            axios.interceptors.request.eject(this.requestInterceptors);
            axios.interceptors.response.eject(this.responseInterceptors);
        }
        errorConfirmedHandler = () =>{
            this.setState({error : null});
        }
        render() {
            return (
                <Aux>
                    <Modal show = {this.state.error} modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;