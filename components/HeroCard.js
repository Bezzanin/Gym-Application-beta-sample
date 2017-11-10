import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from "react-native";
import { Button } from 'react-native-elements';
import { withNavigation } from '@expo/ex-navigation';
import Layout from '../constants/Layout';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
import Database from '../api/database';
import {Grid, Col, Row} from 'react-native-elements';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

@withNavigation
class HeroCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programName: '',
      program: '',
      totalExercises: 0,
      totalWorkouts: 0
    }
  }
  componentDidMount() {
    this.retrieveUserProgram();
    AsyncStorage.getItem("exercises").then((json) => {
      try {
        this.setState({
          exercises: JSON.parse(json)
        })
      } catch(e) {

      }
    });

    Database.DiaryStats((log, totalWeight, totalWorkouts, totalExercises) => {
        this.setState({
            totalWorkouts,
            totalExercises
        });
    });
  }
  retrieveUserProgram() {
    Database.getUserProgramName( (name) => {
      this.setState({
        programName: name
      })
    })
  }
  render() {
    return (

          <Image
            source={require('../assets/images/CTA.png')} 
            style={Common.imageCover}>
            <View style={[Common.container, Common.paddingVertical]}>
            <Grid>
              <Row size={1}>
               
                    <View>
                      <Text style={[Common.lightTitleH4, Common.removeMarginBetweenTitles]}>{I18n.t('YourProgram')}</Text>
                      <Text style={[Common.lightTitleH1, Common.removeMarginBetweenTitles, {width: 300}]}>{this.state.programName} 
                      </Text>
                    </View>
              </Row>
              <Row/>
              <Row size={1}>

                      <Col>
                        <View style={{justifyContent: 'center'}}>
                        <BigTag
                          title={I18n.t('workoutsFinished')}
                          content={this.state.totalWorkouts}
                          color={'#fff'}
                          /> 
                        </View>
                      </Col>
                      <Col>
                      <View style={{justifyContent: 'center'}}>
                        <BigTag
                          title={I18n.t('exersiscesFinished')}
                          content={this.state.totalExercises}
                          color={'#fff'}
                          />
                        </View>
                      </Col>

                  </Row>
                  <Row size={1}>
                    <View style={{justifyContent: 'center'}}>
                      <TouchableOpacity
                        style={[Common.lightButtonRounded, Common.shadowMedium]}
                        onPress={() => {this.goToProgram()}}>
                        <Text style={Common.lightActionTitle}>{I18n.t('ContinueProgram')}</Text>
                      </TouchableOpacity>
                      {/*<TouchableOpacity style={styles.transparent} onPress={() => {this.goToAllPrograms()}}><Text style={styles.textWhite}>All programs</Text></TouchableOpacity>*/}
                    </View>
                    </Row>
                </Grid>
                </View>
     </Image>
    );
  }
  goToProgram = async () => {
    let ownProgram;
    let exercises;
    
    Database.getUserProgramAll((program) => {
      this.setState({
        program
      }, () => {
        console.log(this.state.program);
        this.props.navigator.push('programDashboard', {
          program: this.state.program,
          exercises: this.state.exercises,
        })
      }
      )
    })
    

      
  }
  
  goToAllPrograms = () => {
    this.props.navigator.push('programs');
  }
  
}

export default HeroCard;