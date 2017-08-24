import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import Common from '../constants/common';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
import Layout from '../constants/Layout'
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

const { View, Text, Image, TouchableOpacity } = ReactNative;

@withNavigation
class StatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uriLink: 'not empty string',
      videoLink: 'not empty string',
      hideLogs: true
    }
  }
  componentDidMount() {
    console.log('I am a I am a I am a I am A');
    console.log(this.props.item)
    var storageRef = firebase.storage().ref(`exercises/${this.props.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      this.setState({
        uriLink: url
      })
    }, function(error) {
      console.log(error);
    });
  }
  displayLogThumbnail() {
    if (!this.props.item.photo) {
      return(<View/>)
    }
    else {
      return(
         <View style={[Common.logThumbnail, Common.shadowMedium]}>
            <Image source={{uri: this.state.uriLink || require('../assets/images/CTA.png')}} style={Common.imageStyle}/>
         </View>
      )
    }
  }
  render() {
    const logs = [];
    for (let i = 0; i<this.props.item.sets; i++) {
      let counter = i;
      logs.push(
        <View style={[Common.inlineLogContainer, Common.sectionBorder]}>
          <View style={{flex: 1}}>
            <Text style={Common.darkTitleH4Bold}>{counter + 1}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={Common.darkTitleH4Light}>{this.props.item.reps[counter]} {I18n.t('Reps')}</Text>
          </View>
          <View style={{flex: 1,  paddingRight: Layout.gutter.l*2}}>
            <Text style={Common.darkTitleH4Light}>{this.props.item.weight[counter]} kg</Text>
          </View>
        </View>
      )
    }

    return (
        <View style={[Common.containerHorizontal, {paddingRight: Layout.gutter.l}]}>
          <View style={[this.state.hideLogs && !this.props.last && Common.sectionBorder, Common.paddingVerticalSmall]}>
          <Text style={Common.darkTitleH4Bold}>
                {this.props.item.own ? this.props.item.name || '' : 
                I18n.t(this.props.item.name.replace(/[^A-Z0-9]+/ig, ''))  || ''}
                
              </Text>
        <View style={[Common.inlineContainer]}>
         
          <View style={[Common.inlineLogContainer]}>
           
              <Text style={Common.darkTitleH4Light}>{this.props.item.sets} {I18n.t('Sets')}
                
              </Text>
              
                  <TouchableOpacity onPress={() => {this.setState({hideLogs: !this.state.hideLogs})}}>
                    <Text style={Common.actionTitleH4Light}>
                    {this.state.hideLogs ? I18n.t('ShowMore') : I18n.t('Hide')}</Text>
                  </TouchableOpacity>
            
          
          </View>
        </View>
        
          {this.state.hideLogs ? <View/> : <View>{logs}</View>}
        
        </View>
        </View>
    );
  }
}

module.exports = StatItem;