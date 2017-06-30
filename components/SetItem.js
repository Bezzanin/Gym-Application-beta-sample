import React from 'react';
import {View,
        Text,
        Picker,
        TouchableOpacity, } from 'react-native';
import {Grid, Col, Row} from 'react-native-elements';
import Common from '../constants/common';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class SetItem extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          data: '',
          reps: []
      }
  }
  getOrderDay(number) {
    switch (number){
      case 1: 
        return I18n.t('First');
      case 2:
        return I18n.t('Second');
      case 3:
        return I18n.t('Third');
      case 4:
        return I18n.t('Fourth');
      case 5:
        return I18n.t('Fifth')
      case 6:
        return I18n.t('Sixth')
      case 7:
        return I18n.t('Seventh')
    }
  }
  displayInfo() {
    if (this.props.reps) {
      return (
        <Col size={3}>
           
            <Text style={Common.darkTextH3}>{this.props.reps === undefined ? '' : this.props.reps} {I18n.t('Reps').toLowerCase()}, {this.props.weight} kg</Text>
            
        </Col>
    )}
    else {
      return(<View/>)
    }
  }
  displayDeleteButton() {
    if (this.props.reps) {
      return (
        
        <Col size={1}>
          <TouchableOpacity onPress={() => {this.props.onDelete(this.props.number)}}><Text>X</Text></TouchableOpacity>
        </Col>
    )}
    else {
      return(<View/>)
    }
  }
  render() {    
    return (
      <Grid>
        <View style={[Common.inlineContainer, (this.props.reps ? Common.sectionBorder : ''), Common.container]}>
          <Col size={3}>
            <Text style={Common.darkTitleH3}>{I18n.t('Set')} {this.props.number}</Text>
          </Col>
          {this.displayInfo()}
          {this.displayDeleteButton()}
        </View>
      </Grid>
    );
  }
}
