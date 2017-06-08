import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Image, Alert } from "react-native";
import {Grid, Row, Col} from 'react-native-elements';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import Layout from '../constants/Layout';
import Database from '../api/database';
var _ = require('lodash');
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};


class Profile extends Component {
    constructor(props){
    super(props);
    this.state = {
    allLogs: "",
    totalWorkouts: "",
    totalExercises: "",
    programName: "Not enrolled",
    hasProgram: false,
  }
}

componentDidMount() {
    Database.listeningForStats((log) => {
    this.setState({
          allLogs: log,
          totalWorkouts: log.length,
          totalExercises: _.sumBy(log, 'amountOfExercisesCompleted')
      });
    });
    Database.getUserProgram( (programName) => {
          this.setState({
              programName
          })
      })
    Database.getUserProgram( (hasProgram) => {
          this.setState({
              hasProgram
          })
      })
  }
_displayLeaveButton() {
    leaveProgram = () => {
        Alert.alert(
            I18n.t('LeaveProgram'),
            I18n.t('LeaveProgramAlert'),
            [   { text: 'Cancel', onPress: () => {console.log('Cancelled')}, style: 'cancel' },
                { text: I18n.t('LeaveProgram'), onPress: () => {
                     AsyncStorage.setItem('ownProgramId', '');
                    AsyncStorage.setItem('ownProgramKey', '');
                    this.setState({isLeavingProgram: true}, Database.leaveProgram(this.props.route.params.uid, 'ProgramDashboardScreen.js'))
                    this._retrieveFilteredItems();
                    this.setOwnPropertyTo(false);
                   
                    this.setState({programName: 'leaving program'},
                        Database.leaveProgram(this.props.route.params.uid)
                    )
                    
                } }
            ]
        );
    }
    if (this.state.hasProgram) {
    return(
                <View>
                    <TouchableOpacity onPress={leaveProgram}><Text style={Common.textButton}>{I18n.t('LeaveProgram')}</Text></TouchableOpacity>
                </View>
            );  
    }

}
  render() {
    return (
      <View style={[Common.container, Common.sectionBorder]}>
          <Image source={require('../assets/images/CTA.png')} style={styles.avatar}/>
    <Grid>
        <Col size={1}/>
        <Col size={4}>
            <Row>
                <BigTag
                    title={I18n.t('workoutsFinished')}
                    content={this.state.totalWorkouts}
                    color={'#000'}
                />
            </Row>
            <Row>
                <BigTag
                    title={I18n.t('maximumWeight')}
                    content={'80'}
                    color={'#000'}
                />
            </Row>
            <Row><Text style={Common.textButton}>{I18n.t('ChangeWeight')}</Text></Row>
        </Col>
        <Col size={4}>
            <Row>
                <BigTag
                    title={I18n.t('exersiscesFinished')}
                    content={this.state.totalExercises}
                    color={'#000'}
                />
            </Row>
            <Row>
                <BigTag
                    title={I18n.t('currentProgram')}
                    content={this.state.programName}
                    color={'#000'}
                />
            </Row>
            <Row>{this._displayLeaveButton()}</Row>
        </Col>
        <Col size={1}/>
        </Grid>
        {/*<View style={[Common.container, Common.sectionBorder]}>
            <BigTag
                    title={'Current Program'}
                    content={'3'}
                    color={'#000'}
                />
            </View>
        <View style={[Common.container, Common.sectionBorder]}>
            <BigTag
                    title={'Current Program'}
                    content={'3'}
                    color={'#000'}
                />
            </View>*/}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: Layout.window.width * 0.9,
},
  avatar: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
 },
  h2: {
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 12,
    color: '#000',
    opacity: 0.5,
    marginBottom: 4
  },
 });

export default Profile;