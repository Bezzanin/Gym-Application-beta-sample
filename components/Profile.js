import React, { Component } from "react";
import { View, Text, AsyncStorage, TouchableOpacity, Image, Alert } from "react-native";
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
    Database.DiaryStats((log, totalWeight, totalWorkouts, totalExercises, maxWeight) => {
        this.setState({
            allLogs: log,
            totalWorkouts,
            totalExercises,
            totalWeight,
            maxWeight
        });
    });
    Database.getUserProgramName( (programName) => {
          this.setState({
              programName
          })
      })
    Database.getUserProgram( (hasProgram) => {
          this.setState({
              hasProgram
          })
      })
    Database.listenForDetails((details) => {
        this.setState({
              weight: details.weight,
              height: details.height
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
                   Database.leaveProgram()
                    
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
          <Image source={require('../assets/images/CTA.png')} style={Common.avatar}/>
    <Grid>
        <Col size={1}/>
        <Col size={4}>
            <Row>
                <BigTag
                    title={I18n.t('TotalWeight')}
                    content={this.state.totalWeight}
                    label={'kg'}
                    color={'#000'}
                />
            </Row>
            <Row>
                <BigTag
                    title={I18n.t('ownWeight')}
                    content={this.state.weight}
                    color={'#000'}
                    label={'kg'}
                />
            </Row>
        </Col>
        <Col size={4}>
            <Row>
                <BigTag
                    title={I18n.t('maxWeight')}
                    content={this.state.maxWeight}
                    color={'#000'}
                    label={'kg'}
                />
            </Row>
            <Row>
                <BigTag
                    title={I18n.t('Height')}
                    content={this.state.height}
                    label={'cm'}
                    color={'#000'}
                />
                <Row><Text style={Common.textButton}> </Text></Row>
            </Row>

        </Col>
        <Col size={1}/>
        </Grid>
        <View style={{height: 30}}/>
        <Grid>
            <Col size={1}/>
            <Col size={8}>
                <Row>
                    <BigTag
                    title={I18n.t('currentProgram')}
                    label={this.state.programName}
                    color={'#000'}
                />
                </Row>
                <Row>{this._displayLeaveButton()}</Row>
            </Col>
            <Col size={1}/>
        </Grid>       
      </View>
    );
  }
}
export default Profile;