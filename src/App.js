import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import WeekContainer from './week-container/WeekContainer';
import Day from './day/Day';
import { mykey } from './apiConfig';

class App extends Component {
   constructor(){
     super()
     this.state = {
       fullData: [],
       dailyData: [],
    }
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
              if (index!==-1){
                  dailyData[index].mini = day.main.temp_min;
              }
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
  render() {
    return (
      <div className="App">
         <Switch>
         <Route
          exact
          path='/'
          render={(props) => (
            <WeekContainer {...props} fullData={this.state.fullData} dailyData={this.state.dailyData} />
          )}
          />
          {/* <Route exact path="/" fullData={this.state.fullData} dailyData={this.state.dailyData} component={WeekContainer} /> */}
          <Route
            exact
            path='/:day'
            render={(props) => (
              <Day {...props} fullData={this.state.fullData}/>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;