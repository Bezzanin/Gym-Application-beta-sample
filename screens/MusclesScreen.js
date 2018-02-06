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
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

export default class MusclesScreen extends Component {

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
                
                    <Grid>
                    <Row>
                        
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('triceps')}}>
                                
                                <Image
                                    source={require('../assets/images/muscle_groups/triceps.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('triceps')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('biceps')}}>
                                <Image
                                    source={require('../assets/images/muscle_groups/biceps.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('biceps')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col>

                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('back')}}>
          
                                <Image
                                    source={require('../assets/images/muscle_groups/back.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('back')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('chest')}}>
                                
                                <Image
                                    source={require('../assets/images/muscle_groups/chest.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('chest')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('shoulders')}}>
                                <Image
                                    source={require('../assets/images/muscle_groups/shoulders.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    >                   
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('shoulders')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('legs')}}>
                                
                                <Image
                                    source={require('../assets/images/muscle_groups/legs.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('legs')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                    </Row>
                    <Row>
                        
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('glutes')}}>
                                <Image
                                    source={require('../assets/images/muscle_groups/glutes.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('glutes')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('abs')}}>
                                <Image
                                    source={require('../assets/images/muscle_groups/abs.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('abs')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                       
                    </Row>
                    <Row>
                        
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('calves')}}>
                                <Image
                                    source={require('../assets/images/muscle_groups/calves.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('calves')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                        <Col>
                            <View style={{flex: 1, padding: 0}}>
                            <TouchableOpacity style={[{flex: 1}]}onPress={() => {this.goToExercises('ALL')}}>
                                <Image
                                    source={require('../assets/images/muscle_groups/all.png')}
                                    resizeMode={Image.resizeMode.cover}
                                    style={[{flex: 1, width: null, height: null}, Common.textPadding, Common.coloredView]}
                                    > 
                                        
                                    <Text style={[Common.lightTitleH2, Common.shadowMedium]}>{I18n.t('all')}</Text>
                                </Image>
                            </TouchableOpacity>
                            </View>
                        </Col>
                        
                    </Row>

                    </Grid>
           
            {/* </Image> */}
      </View>
    )
  }

}