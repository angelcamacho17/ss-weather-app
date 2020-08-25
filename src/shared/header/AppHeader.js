import React, { Component } from 'react';
import './AppHeader.scss';
import { Link } from 'react-router-dom';

class AppHeader extends Component {
    
    render() {
        return (
            <Link to="/">
                <h1 className="display-4 header" onClick={this.goBack}>Servi Senior 5-Day Forecast</h1>
            </Link>
        ) 
    }

}

export default AppHeader;