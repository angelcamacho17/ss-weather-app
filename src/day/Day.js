import React from 'react';
import BarGraph from '../graph/BarGraph'

class Day extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            day: props.match.params.day,
            data: []
        }
        console.log(props.match);
        console.log(this.props.fullData)
        this.dayStats = this.dayStats.bind(this)

    }

    componentWillMount(){
        this.dayStats()
    }
    
    componentDidMount() {
        console.log(this.props.fullData)
    }

    dayStats(){
        console.log(this.props.fullData)
        if(this.props.fullData){
            for (let reading of this.props.fullData){
                console.log(reading.dt_txt.split(" ")[0])
                console.log(this.state.day)
                if (reading.dt_txt.split(" ")[0] === this.state.day){
                    this.state.data.push(reading);
                }
            }
            
        }
        console.log(this.state.data)
    }

  render() {
    this.dayStats()
    return (
        <div className="container">
            <h3>Weather for the day {this.state.day}</h3>
            <BarGraph data={this.state.data} percentage={false} width={600} height={300}/>
        </div>
    )
  }

}
export default Day;
