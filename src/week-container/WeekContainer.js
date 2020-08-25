import React from 'react';
import { mykey } from '../apiConfig';
import DayCard from '../day-card/DayCard'
import './WeekContainer.scss';
import { max } from 'moment';

class WeekContainer extends React.Component {
    state = {
        fullData: [],
        dailyData: [],
    }

    getMaxMinPerDay(fullData, dailyData){
        let maxWea = new Map()
        let minWea = new Map()
        for (let day of fullData){
            let date= day.dt_txt.split(" ")[0];
            if (maxWea.get(date)){
                if (day.main.temp_max > maxWea.get(date)){
                    maxWea.set(date, day.main.temp_max)
                    let obj = dailyData.filter(reading => {
                        return reading.dt_txt.split(" ")[0] === day.dt_txt.split(" ")[0]
                    })
                    obj = obj[0]
                    const index = dailyData.indexOf(obj)
                    dailyData[index].max = day.main.temp_max;
                }
                
            } else {
                maxWea.set(date, day.main.temp_max)
            }
            if (day.main.temp_min < minWea.get(date)){
                minWea.set(date, day.main.temp_min)
                let obj = dailyData.filter(reading => {
                    return reading.dt_txt.split(" ")[0] === day.dt_txt.split(" ")[0]
                })
                obj = obj[0]
                const index = dailyData.indexOf(obj)
                dailyData[index].mini = day.main.temp_min;
            }else {
                minWea.set(date, day.main.temp_min)
            }
        }
        return dailyData;
    }
    
    componentDidMount = () => {
        const weatherURL =
        `http://api.openweathermap.org/data/2.5/forecast?q=santiago,cl&units=metric&APPID=${mykey}`
        fetch(weatherURL)
        .then(res => res.json())
        .then(data => {
          const dailyData = data.list.filter(reading => reading.dt_txt.includes("18:00:00"))
          this.setState({
              fullData: data.list,
              dailyData: this.getMaxMinPerDay(data.list, dailyData)
            }, () => console.log(this.state))
        })
    }
    formatDayCards = () => {
        return this.state.dailyData.map((reading, index) => <DayCard reading={reading} key={index} />)
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