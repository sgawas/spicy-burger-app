import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    showSideDrawerHandler = ()=> {
        this.setState({ showSideDrawer: true});
    }

    closeSideDrawerHandler = ()=> {
        this.setState({ showSideDrawer: false});
    }

    render (){
        return (
            <Aux>
                <Toolbar clicked={this.showSideDrawerHandler}/>
                <SideDrawer 
                    displaySidedrawer={this.state.showSideDrawer}
                    clickSideDrawer={this.closeSideDrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
} 

export default Layout;