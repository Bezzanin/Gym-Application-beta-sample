import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import Database from '../api/database';
import StatItem from '../components/StatItem'


export default class NewDiary extends React.Component {

    componentWillMount() {
     AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setState({
          exercises
        }, () => {
          this.setState({ loading: true })
        });
      } catch(e) {
        console.log(e);
      }
  })

        Database.DiaryStats((log) => {
        this.setState({
          items: log
        })
      
    });
    }

    constructor(props) {
    super(props);
    this.state = {
      items: {},
      exercises: [],
      loading: false,
    };
    this.renderItem = this.renderItem.bind(this)
  }
  static route = {
    navigationBar: {
      title: 'NewDiary',
    },
  };
  onDateSelect(date) {
    console.log(date);
    this.setState({ selectedDate: date })
  }
    render() {
    return (
      <View style={styles.container}>
      {this.state.loading &&
      <Agenda
        items={this.state.items}
        renderItem={this.renderItem}
        renderDay={this.renderDay}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#000000',
        selectedDayBackgroundColor: '#CE0707',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#CE0707',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#CE0707',
        selectedDotColor: '#ffffff',
        arrowColor: '#CE0707',
        monthTextColor: '#000',
        agendaDayTextColor: '#000',
        agendaDayNumColor: '#000'
        }}
      />}
       </View>
    );
  }


    renderItem(item) {
      let log = this.state.exercises.filter((exercise) => {
        return exercise._key === item.id
      })      
      let newlog = {
        ...log[0],
        ...item,
      }
    return (
      <View style={styles.item}>
      <StatItem own={newlog._key ? false : true} item={newlog} imageLink={newlog.photo}/>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }



  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 35,
    shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.4,
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
