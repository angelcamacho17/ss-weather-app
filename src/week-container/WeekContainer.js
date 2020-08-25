import React from 'react';
import { mykey } from '../apiConfig';
import DayCard from '../day-card/DayCard'
import './WeekContainer.scss';

class WeekContainer extends React.Component {

    constructor(props){
        super(props)
        console.log(this.props.fullData)
    }
    
    formatDayCards = () => {
        if (this.props.dailyData){
            return this.props.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
        } else {
            return []
        }
    }
  render() {

    return (
        <div className="container">
        <h1 className="display-1 jumbotron">5-Day Forecast.</h1>
        <h5 className="display-5 text-muted">Santiago metropolitan region, CL</h5>
          <div className="content">
            <div className="cards">
                {this.formatDayCards()}
            </div>
          </div>
        </div>
    )
  }
}

export default WeekContainer;