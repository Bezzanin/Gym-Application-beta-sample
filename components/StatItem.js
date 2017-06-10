import React, {Component} from 'react';
import ReactNative from 'react-native';
import {StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {withNavigation} from '@expo/ex-navigation';
import Common from '../constants/common';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

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
    var storageRef = firebase.storage().ref(`exercises/${this.props.item.photo}.png`);
    storageRef.getDownloadURL().then((url) => {
      this.setState({
        uriLink: url
      })
    }, function(error) {
      console.log(error);
    });
  }

  render() {
    const logs = [];
    for (let i = 0; i<this.props.item.sets; i++) {
      let counter = i;
      logs.push(
        <View style={[Common.inlineLogContainer, Common.sectionBorder]}>
          <View>
            <Text style={[Common.darkLogTitleBold]}>{counter + 1} set</Text>
          </View>
          <View>
            <Text style={Common.darkLogTitle}>{this.props.item.reps[counter] || ' '} reps</Text>
          </View>
          <View>
            <Text style={Common.darkLogTitle}>{this.props.item.weight[counter] || ' '} kg</Text>
          </View>
        </View>
      )
    }
    return (
        <View>
        <View style={[Common.inlineContainer, Common.paddingVerticalSmall]}>
          <View style={[Common.logThumbnail, Common.shadowMedium]}>
            <Image source={{uri: this.state.uriLink || require('../assets/images/CTA.png')}} style={Common.imageStyle}/>
          </View>
          <View style={[Common.inlineContainer, {alignItems: 'center'}]}>
            <View style={Common.containerText}>
              <Text style={Common.darkTitleH2}>{this.props.item.name || ''}</Text>
              <View style={[Common.inlineLogContainer, {alignItems: 'center', paddingRight: 25}]}>
                  <Text style={Common.darkTitleH3}>{this.props.item.sets} sets done</Text>
                  <TouchableOpacity onPress={() => {this.setState({hideLogs: !this.state.hideLogs})}}>
                    <Text style={Common.brightActionTitle}>
                    {this.state.hideLogs ? 'Show' : 'Hide'}</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={[Common.containerBasic, Common.sectionBorder]}>
          {this.state.hideLogs ? <View/> : <View style={Common.containerHorizontal}>{logs}</View>}
        </View>
        </View>
    );
  }
}

module.exports = StatItem;