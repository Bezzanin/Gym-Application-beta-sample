import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {Grid, Col, Row} from 'react-native-elements';
import Common from '../constants/common';
import { withNavigation } from '@expo/ex-navigation';

@withNavigation
export default class PromoCard extends Component {
    render() {
    return (
      <View style={[Common.promotionCard,Common.shadowMedium]}>
        <Image source={require('../assets/images/CTA2.png')} 
        style={[Common.centered, Common.imageCardCover, Common.shadowMedium]}>


              <Text style={Common.lightTitleH2}>Gain Faster with Diary</Text>
           
              <Text style={[Common.lightBodyText, Common.centeredText]}>Get your workouts statistics day by day, week by week. Take personal notes and record outdoor activities.
              </Text>

              

              <TouchableOpacity onPress={ () => {
                this.props.navigator.push('diary') } }
                style={Common.lightButtonRounded}>
                <Text style={Common.lightActionTitle}>Check Diary</Text>
              </TouchableOpacity>
          </Image>
      </View>
    );
    }
  }