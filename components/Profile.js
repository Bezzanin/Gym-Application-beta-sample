import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
    totalExercises: ""
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
  }

  render() {
    return (
      <View style={styles.container}>
          <Image source={require('../assets/images/CTA.png')} style={styles.avatar}/>
    <Grid>
        <Col>
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
            <Row><Text>CHANGE</Text></Row>
        </Col>
        <Col>
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
                    content={'3'}
                    color={'#000'}
                />
            </Row>
            <Row><Text>View Statistics</Text></Row>
        </Col>
        </Grid>
        <View style={[Common.container, Common.sectionBorder]}>
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
            </View>
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