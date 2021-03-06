import React from 'react';
import { ScrollView, StyleSheet, View, Text, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import ProgramCard from '../components/ProgramCard';
const styles = require('../constants/styles.js');
import Common from '../constants/common';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import Database from '../api/database';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercisesDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      programsDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      exercises: [],
      programs: [],
      uid: 'Wait for it'
    };
    this.programsRef = this.getRef().child('programs');
    this.exercisesRef = this.getRef().child('exercises');
    this.bestMatchProgram = this.bestMatchProgram.bind(this)
  }

  static route = {
    navigationBar: {
      title: I18n.t('Programs'),
    },
  };
/**
 * Component Life Cycles
 */
  componentWillMount() {
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        const exercises = JSON.parse(json);
        this.setState({exercises});
      } catch(e) {

      }
    })
    Database.listenForDetails((details) => {
      this.setState({
        DaysPerWeek: details.DaysPerWeek,
        userGender: details.gender
      }, () => {
        this.listenForPrograms(this.programsRef)
      })
    })
  }
  componentDidMount() {
    let user = firebase.auth().currentUser;
    this.setState({
      uid: user.uid
    })
  }
  getRef() {
    return firebase.database().ref();
  }

  listenForPrograms(programsRef) {
    programsRef.on('value', (snap) => {
      // get children as an array
      var programs = [];
      snap.forEach((child) => {
        programs.push({
          days: child.val().days,
          day1: child.val().day1,
          day2: child.val().day2,
          day3: child.val().day3,
          day4: child.val().day4,
          day5: child.val().day5,
          day6: child.val().day6,
          day1exercises: child.val().day1exercises,
          day2exercises: child.val().day2exercises,
          day3exercises: child.val().day3exercises,
          day4exercises: child.val().day4exercises,
          day5exercises: child.val().day5exercises,
          day6exercises: child.val().day6exercises,
          _key: child.key,
          name: child.val().name,
          gender: child.val().gender,
          level: child.val().level,
          totalDays: child.val().totalDays,
          photo: child.val().photo
        });
      });
      this.setState({
        programs,
        programsDataSource: this.state.programsDataSource.cloneWithRows(programs)
      }, ()=>{
        this.bestMatchProgram(programs)      
      });
      AsyncStorage.setItem('programs', JSON.stringify(programs))
    });
  }

  bestMatchProgram(programs) {
  let matchByDays = programs.filter((program) => {
          return ( program.days === this.state.DaysPerWeek )
  })
  let matchByGender = matchByDays.filter((program) => {
          return ( program.gender === this.state.userGender || program.gender === 'both' )
  })
  let match = matchByGender[0]
  let matchResult = {
    ...match,
    isBestMatch: true
  }
  this.setState({
    bestProgram: matchResult,
    bestMatchFound: true
  })
  }


  render() {
    return (
     
      <View
        style={[Common.containerBasic]}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
<View style={[Common.centered, {paddingTop:16}]}>
  <Text style={Common.darkTitleH1}>{I18n.t('SelectYourprogram')}</Text>
<Text style = {[Common.darkBodyText, Common. centeredText]}>{I18n.t('ProgramsPromo')}</Text></View>
        <ScrollView horizontal style={styles.programsContainer}>
        {this.state.bestMatchFound &&
        <View><ProgramCard cameFromPrompt={this.props.route.params.cameFromPrompt} item={this.state.bestProgram} uid={this.state.uid} exercises={this.state.exercises}/></View>}
        <ListView
          horizontal
          initialListSize = {2}
          showsHorizontalScrollIndicator={false}
          dataSource={this.state.programsDataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          />
      </ScrollView>
      <View style={{paddingBottom: 10, marginTop: -5}}>
        <TouchableOpacity style={[Common.activityIndicator, {marginVertical: 16}]} onPress={()=>this.props.navigator.push('customProgram')}>
          <Text style={[Common.textButton, {fontWeight: '500'}]}>{I18n.t('CreateYourOwn')}</Text>
          </TouchableOpacity>
      </View>
     </View>
    );
  }

  _renderItem(item) {
    let cher = '../assets/images/program_bg_' + '2.png'
    return (
      <ProgramCard cameFromPrompt={this.props.route.params.cameFromPrompt} item={item} bgLink={cher} uid={this.state.uid} exercises={this.state.exercises}/>
    );
  }
}