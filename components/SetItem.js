import React from 'react';
import {View,
        Text,
        Picker,
        TouchableOpacity,
        StyleSheet } from 'react-native';
import Layout from '../constants/Layout';
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
  componentDidMount() {
    console.log(this.props)
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
  render() {    
    return (

        <View style={[styles.inlineContainer, Common.sectionBorder]}>
          <View style={styles.col3}>
            <Text style={Common.darkTitleH3}>{I18n.t('Set')} {this.props.number}</Text>
          </View>
          <View style={styles.col3}>
           
            <Text style={Common.darkTextH3}>{this.props.reps} reps, {this.props.weight} kg</Text>
            
        </View>
          <View style={styles.col1}>
          <TouchableOpacity onPress={() => {this.props.onDelete(this.props.index)}}><Text style={Common.darkTextH3}>X</Text></TouchableOpacity>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  col3: {
    flex: 3,
    alignItems: 'flex-start'
  },
  col1: {
    flex: 1,
    alignItems: 'flex-end',
  },
  inlineContainer: {
    paddingHorizontal: Layout.gutter.l,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Layout.gutter.m
  }
})
