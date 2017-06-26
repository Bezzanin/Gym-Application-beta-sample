import React, { Component } from 'react';

import {
  Image,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import Filters from '../components/Filters';
import Common from "../constants/common";
import {Grid, Col, Row} from 'react-native-elements'
import Database from '../api/database';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class ExercisesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title: 'Muscle groups',
    },
  };

  goToExercises(filter) {
    console.log('From MusclesScreen ' + filter);
    this.props.navigator.push('exercises', {
      filter: filter
    })
  }

  render() {
   
    return (
      <View
       style={{
           flex: 1
       }}>
          <Image
            source={require('../assets/images/muscles.png')}
            resizeMode={Image.resizeMode.cover}
            style={{flex: 1, width: null, height: null}}
            >
                <View style={{backgroundColor: 'transparent', flex: 1}}>
                    <Grid>
                        <Row/>
                    <Row>
                        
                        <Col>
                            <TouchableOpacity onPress={() => {this.goToExercises('triceps')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Triceps</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <TouchableOpacity onPress={() => {this.goToExercises('biceps')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Biceps</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col>
                            <TouchableOpacity onPress={() => {this.goToExercises('back')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Back</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col>
                             <TouchableOpacity onPress={() => {this.goToExercises('chest')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Chest</Text>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col>
                            <TouchableOpacity onPress={() => {this.goToExercises('glutes')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Glutes</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col>
                             <TouchableOpacity onPress={() => {this.goToExercises('abs')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Abs</Text>
                            </TouchableOpacity>
                        </Col>
                       
                    </Row>
                    <Row>
                        
                        <Col>
                            <TouchableOpacity onPress={() => {this.goToExercises('calves')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Calves</Text>
                            </TouchableOpacity>
                        </Col>
                        <Col>
                             <TouchableOpacity onPress={() => {this.goToExercises('legs')}}>
                                <Text style={[Common.lightTitleH1, Common.shadowMedium, {paddingLeft: 20}]}>Legs</Text>
                            </TouchableOpacity>
                        </Col>
                        
                    </Row>
                    <Row/>
                    </Grid>
                </View>
            </Image>
      </View>
    )
  }

}