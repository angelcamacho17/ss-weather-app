import React from 'react';
import { mykey } from '../../apiConfig';
import DayCard from '../../shared/day-card/DayCard'
import './WeekContainer.scss';
let flag = true;
class WeekContainer extends React.Component {

    constructor(props){
        super(props)
        this.goToDay = this.goToDay.bind(this)
    }

    goToDay(){
    }

    formatDayCards = () => {
        if (this.props.dailyData){
            return this.props.dailyData.map((reading, index) => <DayCard {...this.props} reading={reading} key={index}/>)
        } else {
            return []
        }
    }
  render() {

    return (
        <div className="week-container">
        <div className="page-content">
            <h5 className="display-4 text-muted city">Santiago metropolitan region, CL</h5>
            <div className="content">
                <div className="cards">
                    {this.formatDayCards()}
                </div>
            </div>
            </div>
        </div>
    )
  }
}

export default WeekContainer;