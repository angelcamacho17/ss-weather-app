
import React from 'react';
import './DayCard.scss'
var moment = require('moment');

class DayCard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newDate: '',
      weekdat: '',
      imgURL: ''
    }
    this.goToDay = this.goToDay.bind(this)
  }
  goToDay(){
    this.props.history.push('/' + this.props.reading.dt_txt.split(" ")[0])
  }

  componentWillMount() {
    let dayDate = new Date();
    const week = this.props.reading.dt * 1000;
    let url= toString(`owf owf-${this.props.reading.weather[0].id} owf-5x`);

    this.setState({
      newDate: dayDate.setTime(week),
      weekday: week,
      imgURL: url
    })
    console.log(this.state)
  }

  render() {

    return (
      <div className="col-sm-2" onClick={this.goToDay}>
      <div className="card" >
        <h3 className="card-title">{moment(this.state.newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(this.state.newDate).format('MMMM Do, h:mm a')}</p>
        <i className={`owf owf-${this.props.reading.weather[0].id} owf-5x`}></i>
        <h2>{Math.round(this.props.reading.main.temp)} °C</h2>
        <div className="card-body">
          <div className="max">Max temp: {this.props.reading.max} </div>
          <div className="max">Min temp: {this.props.reading.mini} </div>
          <p className="card-text">{this.props.reading.weather[0].description}</p>
        </div>
      </div>
    </div>
    )
  }
}

// const xDayCard = ({ reading }) => {
//   let newDate = new Date();
//   const weekday = reading.dt * 1000
//   newDate.setTime(weekday)

//   const imgURL = `owf owf-${reading.weather[0].id} owf-5x`;

//   return (
//     <div className="col-sm-2">
//       <div className="card" >
//         <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
//         <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
//         <i className={imgURL}></i>
//         <h2>{Math.round(reading.main.temp)} °C</h2>
//         <div className="card-body">
//           <div className="max">Max temp: {reading.max} </div>
//           <div className="max">Min temp: {reading.mini} </div>
//           <p className="card-text">{reading.weather[0].description}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

export default DayCard;