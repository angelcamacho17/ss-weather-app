import React from 'react';
import BarGraph from '../../shared/graph/BarGraph';
import './Day.scss';
var moment = require('moment');

class Day extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            day: props.match.params.day,
            data: []
        }
        this.dayStats = this.dayStats.bind(this)

    }

    componentWillMount(){
        this.dayStats()
    }
    
    componentDidMount() {
    }

    dayStats(){
        if(this.props.fullData){
            for (let reading of this.props.fullData){
                if (reading.dt_txt.split(" ")[0] === this.state.day){
                    // to avoid duplicates
                    if (this.state.data.indexOf(reading)=== -1)
                    this.state.data.push(reading);
                }
            }
            
        }
    }

  render() {
    this.dayStats()
    return (
        <div className="day-container">
            <div className="page-left">
                <div className="title">
                    <h3 className="city">Santiago de Chile, CL</h3>
                    <h5 className="time">{moment(this.state.day).format('dddd')}</h5>
                </div>
                <div className="graph">
                    <BarGraph data={this.state.data} percentage={false}/>
                </div>
            </div>
            <div className="page-right">
                <h6 className="display-6">Hours - Degrees</h6>
                <div className="temperatures">
                    {this.state.data.map((value, index) => {
                        let imgURL = `owf owf-${value.weather[0].id} owf-1  x`
                        return <div className="temperature" key={index}>
                                    <i className={imgURL}></i>
                                    
                                    <span className="time">
                                        {value.dt_txt.split(" ")[1].split(":")[0]}:
                                        {value.dt_txt.split(" ")[1].split(":")[1]} -
                                    </span>
                                    <span className="degrees">
                                        {Math.round(value.main.temp)} °C
                                    </span>
                                </div>
                    })}
                </div>
            </div>
        </div>
    )
  }

}
export default Day;
