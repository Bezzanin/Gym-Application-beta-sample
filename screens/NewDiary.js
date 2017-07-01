import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  FlatList
} from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import Database from '../api/database';
import AddActivity from '../components/AddActivity';
import StatItem from '../components/StatItem';
import Common from '../constants/common';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import _ from 'lodash'
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};


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
    // Database.listeningForCustomLogs((customLogs) => {
    //   console.log(customLogs);
    //   this.setState({
    //       customLogs
    //     }) 
    // })
    }

    constructor(props) {
    super(props);
    this.state = {
      items: {},
      exercises: [],
      loading: false,
      date: moment().format('YYYY-MM-DD'),
    };
    this.renderItem = this.renderItem.bind(this)
  }
  static route = {
    navigationBar: {
      title: 'NewDiary',
    },
  };

  onDayChange = (date) => {
    this.setState({
      date: new Date(date.year, date.month-1, date.day),
    });
  };

    render() {
      let newItems = {
      [moment(new Date(this.state.date)).format('YYYY-MM-DD')]: [],
      ...this.state.items,
      ...this.state.customLogs
    };
    return (
      <View style={styles.container}>
        <AddActivity/>
      {this.state.loading &&
      
      <Agenda
        items={newItems}
        renderItem={this.renderItem}
        onDayPress={this.onDayChange}
        onDayChange={this.onDayChange}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        firstDay={1}
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
      let log = "";
      let newlog = []
      if (Array.isArray(item)) {
        console.log("IF")
        item.map((item) => {
      log = this.state.exercises.filter((exercise) => {
        return exercise._key === item.id
      })  
         
      newlog.push({
        ...log[0],
        ...item,
      })
      
    })
    console.log(newlog) 
      
      return (
      <View style={styles.item}>
      <FlatList
          data={newlog}
          renderItem={({item}) => 
            (<StatItem own={item._key ? false : true} item={item} imageLink={item.photo}/>)
          }
      />
      </View>
      
    );
  } else {
    console.log("ELSE")
      let newlog = item;
      console.log(newlog)
      return (
      <View style={styles.item}>
      <StatItem own={newlog._key ? false : true} item={newlog} imageLink={newlog.photo}/>
      </View>
    );
    }
    
    
  }

  renderEmptyDate() {
    return (
      <View style={[Common.centered, Common.paddingVertical]}>
          <View style={[Common.brightStats, Common.shadowBright]}>
              <Text style={Common.lightTagTitle}>{I18n.t('DailyAdvice')}</Text>
                <Text style={Common.lightTitleH3}>{I18n.t('RandomAdvice')}</Text>
                
          </View>
      </View>
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
