import React from 'react';
import { ScrollView, StyleSheet, Text, ListView, AsyncStorage, ActivityIndicator, View, TouchableOpacity } from 'react-native';

import Swipeout from 'react-native-swipeout'
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import Database from '../api/database';
import LogItem from '../components/LogItem';
import AddActivity from '../components/AddActivity';
import ExerciseItem from '../components/ExerciseItem';
import StatItem from '../components/StatItem'
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import { withNavigation } from '@expo/ex-navigation';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};



var _ = require('lodash');
var swipeoutBtns = [
  {
    text: I18n.t('Delete'),
    type: 'delete',
    onPress: (() => console.log("SwipeButton")),
    backgroundColor: "#cb0f18",
    color: "#FFF"
  }
]
@withNavigation
export default class LinksScreen extends React.Component {
  static route = {
    navigationBar: {
      title: I18n.t('Diary'),
    },
  };

  componentWillMount() {
     AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setState({
          exercises
        }, () => {
          this.filterExercises()
        });
      } catch(e) {
        console.log(e);
      }
  })
}

  componentDidMount() {
    
      Database.listeningForLogs(this.state.currentDay, (log) => {
        this.setState({
          dateLog: log,
          dataSource: this.state.dataSource.cloneWithRows(log),
      })
      
    });

    this._getCustomLogs();
  }
    _getCustomLogs() {
    Database.listeningForCustomLogs(this.state.currentDay, (CustomLogs) => {
        this.setState({
          CustomLog: CustomLogs,
          CustomLogList: this.state.dataSource.cloneWithRows(CustomLogs),
      }, function dateLogUpdated () {
         if (this.state.CustomLogList.getRowCount() !== 0) {
          this.setState({
          hasData: true,
          loading: false
      })
        }
        else {
          this.setState({
          hasData: false,
          loading: false
      })
        };
      })
    })
    
    }
  constructor(props){
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    super(props);
    this.state = {
    currentDay: moment().format('MM-DD-YY'),
    currentTime: moment().format('HH:mm'),
    dateLog: '',
    CustomLog: [],
    dataSource: ds.cloneWithRows([]),
    exercisesSource: ds.cloneWithRows([]),
    CustomLogList: ds.cloneWithRows([]),
    hasData: false,
    exercises: [],
    loading: true,
  }
  this.filterExercises = this.filterExercises.bind(this);
  this._getCustomLogs = this._getCustomLogs.bind(this);
  }

  onDateChange = (i) => {
    this.setState({
      loading: true,
      currentDay: i.format('MM-DD-YY'),
    }, function dateLogUpdated () {

      Database.listeningForLogs(this.state.currentDay, (log) => {
        this.setState({
          dateLog: log,
          dataSource: this.state.dataSource.cloneWithRows(log),
      }, function dateLogUpdated () {
         this.filterExercises();
      })
      if (this.state.dataSource.getRowCount() !== 0) {
          this.setState({
          hasData: true,
          loading: false
      })
        }
        else {
          this.setState({
          hasData: false,
          loading: false
      })
        }
    }); 
    }) 
  }

  _renderItem(item) {
    goToRoute = () => {
    this.props.navigator.push('exercise', {
      exercise: item
    })
  }
    return (
      <StatItem own={item._key ? false : true} item={item} imageLink={item.photo}/>
    );
  }
  
  filterExercises = async () => {

    var logsId = await this.state.dateLog.map((item) => {

      let newlog;
      let log =   this.state.exercises.filter((exercise) => {
        return exercise._key === item.id
      })

      
      newlog = {
        ...log[0],
        ...item,
      }
   
      return newlog;
      
    });
    this.setState({
          exercisesSource: this.state.exercisesSource.cloneWithRows(logsId)
      });
   
}

  goToProgram = async () => {
        this.props.navigator.push('NewDiary')
      }

  render() {

    const workoutList = (
      <View style={Common.containerBasic}>
        {this.state.hasData && <View>
        <Text style={[Common.darkTitleH1, Common.paddingLeft, Common.paddingVertical]}>{I18n.t('CustomExercises')}</Text>
        <ListView
          dataSource={this.state.CustomLogList}
          initialListSize = {4}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
        /></View>}
        <Text style={[Common.darkTitleH1, Common.paddingLeft, Common.paddingVertical]}>{I18n.t('DoneThisDay')}</Text>
        <ListView
          dataSource={this.state.exercisesSource}
          initialListSize = {4}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
        />
      </View>
      
    )

    const emptyList = (
      <ScrollView>
        <TouchableOpacity onPress={() => {this.goToProgram()}}>
                  <Text style={Common.lightTitleH3}>NewDiary</Text>
                </TouchableOpacity>
                <LogItem
                    titleText={I18n.t('TotalExercises')}
                    title={'50'}
                    weight={120}
                />
                
      </ScrollView>
    )

    const randomTips = (
      <View style={[Common.centered, Common.paddingVertical]}>
          <View style={[Common.brightStats, Common.shadowBright]}>
              <Text style={Common.lightTagTitle}>{I18n.t('DailyAdvice')}</Text>
                <Text style={Common.lightTitleH3}>{I18n.t('RandomAdvice')}</Text>
                
          </View>
      </View>
    )

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
                 <CalendarStrip
                    daySelectionAnimation={{type: 'background', duration: 300, highlightColor: '#CE0707', zIndex: 100}}
                    style={[{paddingTop: 20, paddingBottom: 20}, Common.sectionBorder]}
                    calendarHeaderStyle={{color: 'black'}}
                    calendarColor={'#F5F5F5'}
                    dateNumberStyle={{color: 'black', fontSize: 15}}
                    dateNameStyle={{color: 'black'}}
                    highlightDateNumberStyle={{color: 'white', fontSize: 15}}
                    highlightDateNameStyle={{color: 'white'}}
                    iconContainer={{flex: 0.1, backgroundColor: 'transparent', zIndex: 10}}
                    onDateSelected={(i) => this.onDateChange(i)}
                    styleWeekend={false}
                />
                
                 {this.state.loading && <View style={styles.loading}>
                    
            <ActivityIndicator
                animating
                size="large"
            />
        </View>}
        <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10}}>
                  <Text style = {Common.darkTitleH2}>Lisaa first set</Text>
                  <AddActivity/>
                </View>
              {emptyList}
              {workoutList}
              {randomTips}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  testDay: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.2)"

    },
    dateST: {
      color: 'green'
    }
    
});