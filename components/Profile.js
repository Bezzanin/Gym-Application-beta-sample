import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity, Image, Alert } from "react-native";
import {Grid, Row, Col} from 'react-native-elements';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import Layout from '../constants/Layout';
import Database from '../api/database';
var _ = require('lodash');



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
            'Leave Program',
            'You are about to leave your program, are you sure?',
            [   { text: 'Cancel', onPress: () => {console.log('Cancelled')}, style: 'cancel' },
                { text: 'Leave Program', onPress: () => {
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
                    <TouchableOpacity onPress={leaveProgram}><Text style={Common.textButton}>LEAVE PROGRAM</Text></TouchableOpacity>
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
                    title={'Workouts Finished'}
                    content={this.state.totalWorkouts}
                    color={'#000'}
                />
            </Row>
            <Row>
                <BigTag
                    title={'Current Weight'}
                    content={'80'}
                    color={'#000'}
                />
            </Row>
            <Row><Text style={Common.textButton}>CHANGE</Text></Row>
        </Col>
        <Col size={4}>
            <Row>
                <BigTag
                    title={'Exercise Finished'}
                    content={this.state.totalExercises}
                    color={'#000'}
                />
            </Row>
            <Row>
                <BigTag
                    title={'Current Program'}
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