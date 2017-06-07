import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from "victory-native";
import Layout from '../constants/Layout';
import moment from 'moment';
import Database from '../api/database';
var _ = require('lodash');




class Stats extends Component {

 componentDidMount() {
  this.filterByWeek();
 }

  constructor(props){
    super(props);
    this.filterByWeek = this.filterByWeek.bind(this);
    this.prevWeek = this.prevWeek.bind(this);
    this.nextWeek = this.nextWeek.bind(this);
    this.state = {
    dateLog: '',
    currWeek: moment().format("W"),
    noDataHere: false
  }
}

  filterByWeek() {
    Database.listeningForStats((log) => {
    var filtered = log.filter((item) => {
       return( moment(item.workoutCompleted).format('W') == this.state.currWeek )
     });
     if ( filtered.length < 1 ) {
       this.setState({noDataHere: true,})
     } else {
        this.setState({noDataHere: false,})
     }
    this.setState({
          allLogs: log,
          weekLogs: filtered,
          totalExercises: _.sumBy(filtered, 'amountOfExercisesCompleted'),
          totalWeight: _.sumBy(filtered, 'totalWeight'),
          workoutsDone: filtered.length,
          loading: false,
      });
      this.props.loadingOFF();
    });
  }

 prevWeek = () => {
      this.setState({
          currWeek: this.state.currWeek - 1
      }, function dateLogUpdated () {
        this.filterByWeek();
      })
    };
nextWeek = () => {
      this.setState({
          currWeek: this.state.currWeek + 1
      }, function dateLogUpdated () {
        this.filterByWeek();
      })
    };


  render() {
    return (
      <View>
      <View style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Exercises Done:</Text>
        <VictoryChart
        width={300}
        height={200}
        domainPadding={20}
        width={0.8 * Layout.window.width}
  >

    <VictoryAxis
      tickValues={[1, 2 , 3, 4 ,5 ,6, 7]}
      tickFormat={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
      offsetX={0}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => (Math.round(x))}
    />
    <VictoryBar
      style={{
        data: {fill: "#CE0606", width: 20}
      }}
      data={this.state.weekLogs}
      x={(d) => parseInt(moment(d.workoutCompleted).format('d'))}
      y={(d) => d.amountOfExercisesCompleted}
    />
  </VictoryChart>
  <TouchableOpacity onPress={this.prevWeek}><Text>Prev Week</Text></TouchableOpacity>
  <TouchableOpacity onPress={this.nextWeek}><Text>Next Week</Text></TouchableOpacity>
  {this.state.noDataHere && <View style={styles.loading}>
            <Text>No DATA HERE</Text>
        </View>}
  </View>
    <View style={styles.TextContainer}>
    <Text>Total Exercises</Text>
    <Text style={styles.number}>{this.state.totalExercises}</Text>
    <Text>Total Weight</Text>
    <Text style={styles.number}>{this.state.totalWeight}</Text>
    </View>
    </View>

    <View style={styles.container}>
    <View style={styles.chartContainer}>
        <Text style={styles.title}>Lifted Weight:</Text>
       <VictoryChart
        width={300}
        height={200}
        domainPadding={20}
        width={0.8 * Layout.window.width}
  >
    <VictoryAxis
      tickValues={[1, 2 , 3, 4 ,5 ,6, 7]}
      tickFormat={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
      offsetX={0}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => (Math.round(x))}
    />
    <VictoryBar
      style={{
        data: {fill: "#CE0606", width: 20}
      }}
      data={this.state.weekLogs}
      x={(d) => parseInt(moment(d.workoutCompleted).format('d'))}
      y={(d) => d.totalWeight}
    />
  </VictoryChart>
  </View>
    <View style={styles.TextContainer}>
    <Text>Workouts Done:</Text>
    <Text style={styles.number}>{this.state.workoutsDone}</Text>
    <Text>Time Spent</Text>
    <Text style={styles.number}>1h</Text>
    </View>
      </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  chartContainer: {
      flex: 3,
  },
  TextContainer: {
      flex: 2,
      alignItems: 'flex-end',
      marginRight: 30,
      marginTop: 20,
  },
  number: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 15,
    marginLeft: 30,
    marginTop: 20,
    marginBottom: -20,
  },
});

export default Stats;