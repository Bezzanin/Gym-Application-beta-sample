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
    return (
     
        <View style={[Common.inlineContainer, Common.paddingVerticalSmall, Common.sectionBorder]}>
          <View style={[Common.logThumbnail, Common.shadowMedium]}>
            <Image source={{uri: this.state.uriLink || require('../assets/images/CTA.png')}} style={Common.imageStyle}/>
          </View>
          <View style={[Common.inlineContainer]}>
            <View style={Common.containerText}>
              <Text style={Common.darkTitleH3}>{this.props.item.name || ''}</Text>
              <View style={Common.inlineContainer}>
                <Text style={[Common.darkTitleH4, Common.marginRightM]}>{this.props.item.weight} kg</Text>
                <Text style={[Common.darkTitleH4, Common.marginRightM]}>{this.props.item.sets} sets</Text>
                <Text style={[Common.darkTitleH4, Common.marginRightM]}>{this.props.item.reps} reps</Text>
              </View>
            </View>
          </View>
        </View>
    );
  }
}

module.exports = StatItem;