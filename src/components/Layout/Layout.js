import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar 
                isAuth={this.props.isAuthenticated}
                clicked={this.showSideDrawerHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps) (Layout);