import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import ExerciseItem from '../components/ExerciseItem';
import BigTag from '../components/BigTag';
import { Font } from 'expo';
import Database from '../api/database';
import Common from '../constants/common';
import moment from 'moment';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

@withNavigation
export default class ProgramBadge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLeaving: false,
            lastWorkoutDate: '',
            sequence: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isLeaving !== nextProps.isLeaving) {
            console.log('HAS RECEIVED NEW PROPS')
            console.log(nextProps.isLeaving);
            console.log(nextProps.sequence)
            this.setState({
                isLeaving: true
            })
        }
    }
    componentDidMount() {
        Database.getLastWorkoutDate( (date) => {
            this.setState({
                lastWorkoutDate: date
            })
        })
        console.log('Sequence of exercises is below');
        console.log(this.state.sequence);
        console.log('props')
        console.log(this.props.sequence)
        this.loadProps().then((sequence) => {
            this.setState({
                isLoading: false,
                sequence
            })
        })
    }
    async loadProps() {
        let sequence = await this.props.sequence;
        return sequence;
    }
  render() {
      if (this.state.isLoading) {
          return (
              <View><Text>Is loading...</Text>
              </View>
          )
      }
 
    return (
        <View>
        <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/program_dashboard.png')}
              style={{flex: 1, width: null, height: null}}>
                <View style={styles.heroContainer}>
                    <Text style={styles.programState}>{I18n.t('YourProgram')}</Text>
                    <View style={styles.inlineTagContainer}>
                        <BigTag title={I18n.t('PerWeek')} content={this.props.days}/>
                        <BigTag title={I18n.t('Total')} content={'30'}/>
                    </View>
                    {this._displayEnrollButton()}
                </View>
            </Image>
        </View>
        {this.showContinueExercise()}
        {this._displayLeaveButton()}
        </View>
    )
  }
  showContinueExercise2() {
    console.log(this.props.ownProgram)
    if (this.props.ownProgram) {
        continueProgram = () => {
                this.props.handleContinueProgram();
            }
        let index = 0;
        let day = 'day1';
        return (
            <View>
                
                    {/*<ExerciseItem showSeparator={false} onPress={() => {continueProgram()}} item = {this.props.sequence[day][index]} own={false}/>*/}
                        <TouchableOpacity onPress={() => {continueProgram()}}>
                            <Text style={Common.darkTitleH1}>{I18n.t('ContinueProgram')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {console.log(this.props.sequence)}}><Text>Get props sequence</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => {console.log(this.state.sequence)}}><Text>Get state sequence</Text></TouchableOpacity>
            </View>
        )
    }
  }
  showContinueExercise() {
    let today = moment().format('MM-DD-YY');
    if (this.state.isLoading) {
          return (
              <View><Text>Is loading...</Text>
              </View>
          )
      }
      else if (this.state.lastWorkoutDate === today) {
        return (
            <View style={Common.container}>
                <Text style={Common.darkTitleH2}>You have already completed workout today</Text>
            </View>
        )
      }
    else {
        //let timeout = setTimeout(() => {
    switch (this.props.programName) { 
        case this.props.program._key:
            let index = 1;
            let dayNumber = '';
            let day = 'day1';
            console.log('Are you leaving program? ' + this.state.isLeaving)
            console.log('Program name is ' + this.props.programName + ' and program key is ' + this.props.program._key)
            console.log('About to trigger Database.js');
            
                // Database.getCurrentExerciseIndex( (currentIndex) => {index = currentIndex});
                // Database.getCurrentWorkoutDay( (currentDay) => { dayNumber = currentDay});
            
            day = 'day' + dayNumber;
            continueProgram = () => {
                this.props.handleContinueProgram();
            }
           
            return (
                <View style={[Common.container, Common.sectionBorder]}>
                    <TouchableOpacity onPress={() => {continueProgram()}}>
                            <Text style={Common.darkTitleH1}>{I18n.t('ContinueProgram')}</Text>
                        </TouchableOpacity>
                    {/*<ExerciseItem showSeparator={false} onPress={() => {continueProgram()}} item = {this.props.sequence[day][index]} own={false}/>*/}
                </View>
            )
        default: return( <View/> )
    } 
    }
  }
_displayLeaveButton() {
    leaveProgram = () => {
        Alert.alert(
            'Leave Program',
            'You are about to leave your program, are you sure?',
            [   { text: 'Cancel', onPress: () => {console.log('Cancelled')}, style: 'cancel' },
                { text: 'Leave Program', onPress: () => {
   
                    this.setState({isLeaving: true}, Database.leaveProgram())
                    AsyncStorage.setItem('ownProgramId', '');
                
                } }
            ]
        );
    }
    switch (this.props.programName) {

        case this.props.program._key:
            return(
                <View>
                    
                </View>
            );
        default: 
            return(
                <View/>
            );
    }
}
_displayEnrollButton() {
    enrollProgram = () => {
        let emptyArr = [];
        Database.enrollIntoProgram(this.props.program);
        Database.saveExerciseSequence(this.props.sequence);
        console.log('Saving')
        console.log(this.props.sequence);
        AsyncStorage.setItem('ownProgramKey', JSON.stringify(this.props.program._key));
        AsyncStorage.setItem('logs', JSON.stringify(emptyArr));
        this.props.handleClick(true);
    }
    goToRoute = () => {
        this.props.navigator.push('editProgramDash', {
        program: this.props.program,
        uid: this.props.uid
        })
    }
    continueProgram = () => {
        this.props.handleContinueProgram();
    }
    switch (this.props.programName) {
        case '':
            return(
                    <TouchableOpacity style={Common.lightButtonRounded} onPress={enrollProgram}>
                        <Text style={Common.lightActionTitle}>{I18n.t('EnrollToProgram')}</Text>
                    </TouchableOpacity>
            );
        case this.props.program._key:
            return(
                    <TouchableOpacity style={Common.lightButtonRounded} onPress={goToRoute}>
                        <Text style={Common.lightActionTitle}>{I18n.t('EditProgram')}</Text>
                    </TouchableOpacity>
            );
        default: 
            return(
                <View>
                    {/*<TouchableOpacity style={styles.actionButton} onPress={() => {console.log('clicked')}}><Text style={styles.buttonTitle}>DEFAULT CASE</Text></TouchableOpacity>*/}
                </View>
            );
    }
}
  
}

const styles = StyleSheet.create({
imageContainer: {
      height: 200,
      backgroundColor: 'transparent',
      shadowOffset: {
          width: 0,
          height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.5,
      marginBottom: 10
  },
  programState: {
    fontWeight: '600',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  actionButton: {
      width: Layout.window.width * 0.5 + 50,
      borderRadius: 100,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      alignSelf: 'flex-start',
      marginLeft: 0,
      paddingLeft: 0,
      backgroundColor: 'transparent'
  },
  heroContainer: {
    marginVertical: Layout.window.width * 0.06,
    flex: 3,
    justifyContent: 'space-between',
    marginHorizontal: Layout.window.width * 0.08,
  },
   title: {
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    fontSize: 20,
  },
  paragraph: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
    fontSize: 14,
    letterSpacing: 0,
    //lineHeight: 18,
    opacity: 0.8,
  },
  buttonTitle: {
    fontSize: 16,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    marginVertical: 7,
  },
  inlineTagContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around'

  }
})