import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.scss';

class AppHeader extends Component {
    constructor(props) {
        super(props);   
        this.goBack = this.goBack.bind(this);   
    }

    goBack(){
        this.props.history.push('/' + this.props.reading.dt_txt.split(" ")[0])
    }
    render() {
        return (
            <h1 className="display-4 header">Servi Senior 5-Day Forecast</h1>
        ) 
    }

}

export default AppHeader;