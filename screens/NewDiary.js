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
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import _ from 'lodash'
import en from '../constants/en'; import ru from '../constants/ru';
import { MaterialIcons } from '@expo/vector-icons';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['fi'] = {
    monthNames: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
  monthNamesShort: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
  dayNames: ['Sunnuntai',,'Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai'],
  dayNamesShort: ['Su','Ma','Ti','Ke','To','Pe','La']
}
LocaleConfig.defaultLocale = 'fi';


export default class NewDiary extends React.Component {

    componentWillMount() {

      Database.getWorkoutDays((days) => {
        if (days !== null) {
          console.log('IF', days)
        this.setState({
            workoutDays: days
          }, () => {this.renderWorkoutIcons()}) 
        } else {
          AsyncStorage.getItem('workoutDays').then((val) => {
            var days = JSON.parse(val)
            console.log('Workout Days', JSON.parse(val));
            Database.setWorkoutDays(days);
            this.setState({
              workoutDays: days
            }, () => {
              this.renderWorkoutIcons();
              AsyncStorage.removeItem("workoutDays");
            })
          })
        }
      })

      


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
        }, () => {
          this.onDayChange({
            year: moment().format("YYYY"), 
            month: moment().format("MM"), 
            day: moment().format("DD")}) 
        });
        })
      
    }

    constructor(props) {
    super(props);
    this.state = {
      items: {},
      exercises: [],
      loading: false,
      date: moment().format('YYYY-MM-DD'),
      workoutDays: ["No"],
      Mo: false,
      Tu: false,
      We: false,
      Th: false,
      Fr: false,
      Sa: false,
      Su: false
    };
    this.renderItem = this.renderItem.bind(this)
    this.renderWorkoutIcons = this.renderWorkoutIcons.bind(this)
    this.quickAddWorkout = this.quickAddWorkout.bind(this)
  }
  static route = {
    navigationBar: {
      title: I18n.t('Diary'),
      renderRight: () => <AddActivity/>
    },
  };

  quickAddWorkout() {
              // var myArr = this.state.items
          // Object.keys(myArr)
          // .forEach(function eachKey(key) { 
          //   console.log(key); // alerts key 
          //   console.log(myArr[key]); // alerts value
          // });
          var arr = _.values(this.state.items);
          var lastLog = _.last(arr);
          Database.pushWorkoutLog(_.flatten(lastLog));
  }
  onDayChange = (date) => {
    let initialDate = new Date(date.year, date.month-1, date.day);
    let choosenDate = moment(new Date(initialDate)).format('YYYY-MM-DD')
    let hasWorkoutDay = false
      if (this.state.workoutDays.includes(moment(choosenDate).format("dd"))) {
      hasWorkoutDay = true;
    } else { hasWorkoutDay = false}
    let newItems = {
        // if (moment(this.state.date).format("dd")) = "Th") {}
      [choosenDate]: [],
      ...this.state.items,
      ...this.state.customLogs
    };
    this.setState({
      date: moment(new Date(initialDate)).format('YYYY-MM-DD'),
      newItems,
      hasWorkoutDay 
    });
  };

  renderWorkoutIcons() {
    if (this.state.workoutDays.includes("Mo")) {this.state.Mo = true;} else { this.state.Mo = false}
    if (this.state.workoutDays.includes("Tu")) {this.state.Tu = true;} else { this.state.Tu = false}
    if (this.state.workoutDays.includes("We")) {this.state.We = true;} else { this.state.We = false}
    if (this.state.workoutDays.includes("Th")) {this.state.Th = true;} else { this.state.Th = false}
    if (this.state.workoutDays.includes("Fr")) {this.state.Fr = true;} else { this.state.Fr = false}
    if (this.state.workoutDays.includes("Sa")) {this.state.Sa = true;} else { this.state.Sa = false}
    if (this.state.workoutDays.includes("Su")) {this.state.Su = true;} else { this.state.Su = false}
  }

    render() {
    return (
      <View style={styles.container}>
        <View style={styles.workoutsContainer}>
        {this.state.Mo ? <MaterialIcons name="fitness-center" size={20} color="#CE0707" /> : <View style={{width: 20}}/>}
        {this.state.Tu ? <MaterialIcons name="fitness-center" size={20} color="#CE0707" /> : <View style={{width: 20}}/>}
        {this.state.We ? <MaterialIcons name="fitness-center" size={20} color="#CE0707" /> : <View style={{width: 20}}/>}
        {this.state.Th ? <MaterialIcons name="fitness-center" size={20} color="#CE0707" /> : <View style={{width: 20}}/>}
        {this.state.Fr ? <MaterialIcons name="fitness-center" size={20} color="#CE0707" /> : <View style={{width: 20}}/>}
        {this.state.Sa ? <MaterialIcons name="fitness-center" size={20} color="#CE0707" /> : <View style={{width: 20}}/>}
        {this.state.Su ? <MaterialIcons name="fitness-center" size={20} color="#CE0707" /> : <View style={{width: 20}}/>}
        </View>
        
      {this.state.loading &&
      <Agenda
        items={this.state.newItems}
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
        agendaDayNumColor: '#000',
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
        item.map((item) => {
      log = this.state.exercises.filter((exercise) => {
        return exercise._key === item.id
      })  
         
      newlog.push({
        ...log[0],
        ...item,
      })
    })

      return (
      <View style={[styles.item, Common.shadowLight]}>
        
        <Text style={[{paddingLeft: Layout.gutter.l, paddingTop: Layout.gutter.m},Common.darkTitleH3]}>{I18n.t('DoneThisDay')}</Text>
        
      <FlatList
          data={newlog}
          renderItem={({item, index}) => 
            (<StatItem 
              key={index}
              last={index === newlog.length-1 ? true : false} 
              own={item._key ? false : true} 
              item={item} 
              imageLink={item.photo}/>)
          }
      />
      </View>
      
    );
  } else {
      let newlog = item;
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
      <View style={[Common.paddingLeftSmall, Common.marginVerticalSmall]}>
          <View style={[Common.lightStats, Common.shadowLight, {width: Layout.window.width*0.75}]}>
              <Text style={Common.darkTagTitle}>{I18n.t('DailyAdvice')}</Text>
                <Text style={Common.darkTitleH3}>{I18n.t('RandomAdvice')}</Text>
                
          </View>
          <View style={{paddingLeft: 0}}>
            <View style={{height: 10}}/>
          <TouchableOpacity style={Common.leftAttachedButton} onPress={() => {
            //this.quickAddWorkout();
            this.props.navigator.push('QuickWorkout')
            }}>
            <Text style={Common.darkActionTitle}>Quick workout</Text>
          </TouchableOpacity>
          </View>
          {this.state.hasWorkoutDay &&
          <View style={{paddingLeft: 0}}>
            <View style={{height: 10}}/>
          <TouchableOpacity style={Common.leftAttachedButton} onPress={() => {this.goToProgram()}}>
            <Text style={Common.darkActionTitle}>Begin workout</Text>
          </TouchableOpacity>
          </View>}

      </View>
    );
  }

    goToProgram = async () => {
    let ownProgram;
    let exercises;
    
    Database.getUserProgramAll((program) => {
      this.setState({
        program
      }, () => {
        this.props.navigator.push('programDashboard', {
          program: this.state.program,
          exercises: this.state.exercises,
        })
      }
      )
    })
    

      
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
  workoutsContainer: {
    alignSelf: 'center',
    flexDirection: 'row', 
    position: 'absolute', 
    width: Layout.window.width * 0.85, 
    justifyContent: 'space-between',
    marginHorizontal: 15
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
