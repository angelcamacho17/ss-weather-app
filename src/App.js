import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from "react-router-dom";
import WeekContainer from './components/week-container/WeekContainer';
import Day from './components/day/Day';
import { mykey } from './apiConfig';
import AppHeader from './shared/header/AppHeader';
import Footer from './shared/footer/Footer';

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
      console.log(fullData)
      for (let day of fullData){
          let date= day.dt_txt.split(" ")[0];
          if (maxWea.get(date)){
              if (day.main.temp > maxWea.get(date)){
                  maxWea.set(date, day.main.temp)
                  let obj = dailyData.filter(reading => {
                      return reading.dt_txt === day.dt_txt.split(" ")[0]+ " 18:00:00"
                  })
                  obj = obj[0]
                  const index = dailyData.indexOf(obj)
                  if (index!==-1){
                    dailyData[index].max = day.main.temp;

                  }

              }
              
          } else {
              if(maxWea.get(date)===undefined){
                maxWea.set(date, day.main.temp)
                let obj = dailyData.filter(reading => {
                  return reading.dt_txt === day.dt_txt.split(" ")[0]+ " 18:00:00"
                })
                obj = obj[0]
                const index = dailyData.indexOf(obj)
                if (index!==-1){
                  dailyData[index].max = day.main.temp;

                }
              }
          }
          if (minWea.get(date)){
            if (Math.round(day.main.temp) < minWea.get(date)){
                minWea.set(date, Math.round(day.main.temp))
                let obj = dailyData.filter(reading => {
                    return reading.dt_txt === day.dt_txt.split(" ")[0] + " 18:00:00"
                })
                obj = obj[0]
                const index = dailyData.indexOf(obj)
                if (index!==-1){
                    dailyData[index].mini = Math.round(day.main.temp);
                }
            }
          } else {
              if(minWea.get(date)===undefined){
                minWea.set(date, Math.round(day.main.temp))
                let obj = dailyData.filter(reading => {
                  return reading.dt_txt === day.dt_txt.split(" ")[0] + " 18:00:00"
                })
                obj = obj[0]
                const index = dailyData.indexOf(obj)
                if (index!==-1){
                    dailyData[index].mini = Math.round(day.main.temp);
                }
              }
          }
        }
        console.log(dailyData)
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
          })
      })
  }
  render() {
    return (
      <div className="App">
      <AppHeader {...this.props}></AppHeader>
         <Switch>
         <Route
          exact
          path='/'
          render={(props) => (
            <WeekContainer {...props} fullData={this.state.fullData} dailyData={this.state.dailyData} />
          )}
          /><Route
            exact
            path='/:day'
            render={(props) => (
              <Day {...props} fullData={this.state.fullData}/>
            )}
          />
        </Switch>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;