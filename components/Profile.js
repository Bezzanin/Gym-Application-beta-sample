import React, { Component } from "react";
import { View, Text, AsyncStorage, TouchableOpacity, Image, Alert } from "react-native";
import {Grid, Row, Col} from 'react-native-elements';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import Layout from '../constants/Layout';
import Database from '../api/database';
var _ = require('lodash');
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en';
I18n.fallbacks = true;
I18n.translations = {fi, en};


class Profile extends Component {
    constructor(props){
    super(props);
    this.state = {
    allLogs: "",
    totalWorkouts: "",
    totalExercises: "",
    programName: "Not enrolled",
    hasProgram: false,
    totalWeight: 0
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
              height: details.height,
              userName: details.name
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
        <View style={{marginBottom: 16}}>
            <BigTag
                        content={"Hei, "+this.state.userName+" !"}
                        color={'#000'}
                    />
        </View>
                <View>
    <Grid>
       
        <Col size={3}>
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
        <Col size={3}>
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
        </Grid>
        </View>
        
        <View style={[Common.sectionBorder, {height: 10, marginBottom: 15}]}/>
        <Grid>
            
            <Col size={8}>
                <Row>
                    <BigTag
                    title={I18n.t('currentProgram')}
                    content={this.state.programName}
                    color={'#000'}
                />
                </Row>
                <Row>{this._displayLeaveButton()}</Row>
            </Col>
        </Grid>       
      </View>
    );
  }
}
export default Profile;