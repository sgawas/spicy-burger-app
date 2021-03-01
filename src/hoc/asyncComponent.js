import React, { Component } from 'react';

const asyncComponent = ( importComponent )=> {
    return class extends Component {
        state = {
            component: null
        }
        
        componentDidMount(){
            importComponent()
                .then(cmp => {
                    this.setState({ component: cmp.default });
                });
        }

        render(){
            const Comp = this.state.component;
            return Comp ? <Comp {...this.props} /> : null;
        }
    }
}

export default asyncComponent;