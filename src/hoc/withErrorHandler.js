import React, { useState, useEffect } from 'react';

import Aux from './Aux';
import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    const WithErrorHandler = props => {
        const [error, setError] = useState(null);
        const requestInterceptor = axios.interceptors.request.use(
            req => {
            setError(null);
            return req;
            }
        );
        const responseInterceptor = axios.interceptors.response.use(
            res => res,
            error => {
            setError(error);
            console.log('WithErrorHandler: ', error);
            return Promise.reject(error);
            }
        );
        useEffect(
            () => {
            return () => {
                axios.interceptors.request.eject(requestInterceptor);
                axios.interceptors.response.eject(responseInterceptor);
            };
            },
            [requestInterceptor, responseInterceptor]
        );
        return (
            <Aux>
                <Modal 
                showOrderSummary={error !== null}
                cancelOrderSummary={() => setError(null)}
                >
                    {error !== null ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        );
    };
    return WithErrorHandler;
};

export default  withErrorHandler;


// <Aux>
//                     <Modal 
//                         showOrderSummary={this.state.error} 
//                         cancelOrderSummary={this.errorConfirmedHandler}>
//                         { this.state.error? this.state.error.message : null }
//                     </Modal>
//                     <WrappedComponent {...this.props}/>
//                 </Aux>