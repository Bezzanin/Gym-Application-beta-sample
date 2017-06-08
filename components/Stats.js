import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLine } from "victory-native";
import {Grid, Col, Row} from 'react-native-elements';
import Layout from '../constants/Layout';
import BigTag from '../components/BigTag';
import moment from 'moment';
import Theme from '../constants/Theme';
import Common from '../constants/common'
import Database from '../api/database';
var _ = require('lodash');
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};


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
      <View>

      <Grid>
        <Col size ={2}>
            <View style ={[Common.minusHorizontal, Common.paddingVertical]}>
              <VictoryChart
                theme={Theme}
                width={Layout.width.l}
                height={Layout.width.m}
                domainPadding={Layout.gutter.l}
                >
                  <VictoryAxis
                    tickValues={[1, 2 , 3, 4 ,5 ,6, 7]}
                    tickFormat={["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"]}
                    offsetX={0}
                    style={{
                        grid: {stroke: "#ECECEC", strokeWidth: Layout.gutter.m + Layout.gutter.xs}
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (Math.round(x))}
                  />
                  <VictoryBar
                    style={{
                        data: {fill: "#CE0606", width: Layout.gutter.m+ Layout.gutter.xs},
                    }}
                    data={this.state.weekLogs}
                    x={(d) => parseInt(moment(d.workoutCompleted).format('d'))}
                    y={(d) => d.amountOfExercisesCompleted}
                  />
              </VictoryChart>
              <View style={{flexDirection: 'row', marginLeft: 38}}>
              <TouchableOpacity onPress={this.prevWeek}><Text style={Common.darkNameTag}>{I18n.t('Previous')} |</Text></TouchableOpacity>
              <TouchableOpacity onPress={this.nextWeek}><Text style={Common.darkNameTag}>{I18n.t('NextWeek')}</Text></TouchableOpacity>
              </View>

            </View>
        </Col>
        <Col size={1}>
          <View style={[Common.containerLeft, Common.paddingVertical]}>
            <BigTag
              title={I18n.t('TotalExercises')}
              content={this.state.totalExercises}
              color={'#000'}
              />
              <BigTag
              title={I18n.t('TotalWeight')}
              content={this.state.totalWeight}
              color={'#000'}/>
              <BigTag
              title={I18n.t('workoutsFinished')}
              content={this.state.workoutsDone}
              color={'#000'}
              />
          </View>
        </Col>
    </Grid>
    
      {/*
      <Grid>
        <Col size ={2}>
            <View style ={[Common.minusHorizontal, Common.paddingVertical]}>
              <VictoryChart
                theme={Theme}
                width={Layout.width.l}
                height={Layout.width.m}
                domainPadding={Layout.gutter.l}
                >
                  <VictoryAxis
                    tickValues={[1, 2 , 3, 4 ,5 ,6, 7]}
                    tickFormat={["Mo", "Tu", "We", "Th", "Fr", "St", "Su"]}
                    offsetX={0}
                    style={{
                        grid: {stroke: "#ECECEC", strokeWidth: Layout.gutter.m + Layout.gutter.xs}
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (Math.round(x))}
                  />
                  <VictoryBar
                    style={{
                        data: {fill: "#CE0606", width: Layout.gutter.m+ Layout.gutter.xs},
                    }}
                    data={this.state.weekLogs}
                    x={(d) => parseInt(moment(d.workoutCompleted).format('d'))}
                    y={(d) => d.totalWeight}
                  />
              </VictoryChart>
            </View>
        </Col>
        <Col size={1}>
          <View style={[Common.containerLeft, Common.paddingVertical]}>
            
          </View>
        </Col>
    </Grid> */}

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