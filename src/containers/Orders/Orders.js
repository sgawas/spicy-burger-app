import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        loading: true,
        orders: []
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(res=> {
                const fetchedOrders = [];
                console.log(res.data);
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                this.setState({ loading: false, orders: fetchedOrders });
                
            })
            .catch(err=> {
                console.log(err);
                this.setState({ loading: false });
            });
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id} price={order.price} ingredients={order.ingredients}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);