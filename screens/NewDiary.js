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
import Layout from '../constants/Layout'
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import _ from 'lodash'
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['fi'] = {
    monthNames: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Tuokokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
  monthNamesShort: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Tuokokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
  dayNames: ['Sunnuntai',,'Maanantai','Tiistai','Keskivikko','Torstai','Perjantai','Lauantai'],
  dayNamesShort: ['Su','Ma','Ti','Ke','To','Pe','La']
}
LocaleConfig.defaultLocale = 'fi';


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
      title: I18n.t('Diary'),
      renderRight: () => <AddActivity/>
    },
  };

  onDayChange = (date) => {
    this.setState({
      date: new Date(date.year, date.month-1, date.day),
    });
  };

  sendDataTesing() {
    let name = "TEST";
    let weight = [77, 77, 77];
    let sets = 3;
    let reps = [9, 9, 9]

    Database.addExerciseStats(name, weight, sets, reps);
  }
    render() {
      let newItems = {
      [moment(new Date(this.state.date)).format('YYYY-MM-DD')]: [],
      ...this.state.items,
      ...this.state.customLogs
    };
    return (
      <View style={styles.container}>
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
      let solo = false;
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
      <View style={[styles.item, Common.shadowLight]}>
        
        <Text style={[{paddingLeft: Layout.gutter.l, paddingTop: Layout.gutter.m},Common.darkTitleH3]}>{I18n.t('DoneThisDay')}</Text>
        
      <FlatList
          data={newlog}
          renderItem={({item, index}) => 
            (<StatItem last={index === newlog.length-1 ? true : false} own={item._key ? false : true} item={item} imageLink={item.photo}/>)
          }
      />
      </View>
      
    );
  } else {
    console.log("ELSE")
      let newlog = item;
      console.log(newlog)
      return (
      <View style={[styles.item, Common.shadowLight]}>
        <Text style={[{paddingLeft: Layout.gutter.l, paddingTop: Layout.gutter.m},Common.darkTitleH3]}>{I18n.t('CustomExercises')}</Text>
      <StatItem last={true} own={newlog._key ? false : true} item={newlog} imageLink={newlog.photo}/>
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
    marginTop: 35,
    paddingBottom: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
