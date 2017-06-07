import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {Grid, Col, Row} from 'react-native-elements';
import Common from '../constants/common';
import { withNavigation } from '@expo/ex-navigation';

@withNavigation
export default class PromoCard2 extends Component {
    render() {
    return (
      <View style={[Common.promotionCard,Common.shadowMedium]}>
        <Image source={require('../assets/images/CTA2.png')} 
        style={[Common.centered, Common.imageCardCover, Common.shadowMedium]}>


              <Text style={Common.lightTitleH2}>Exercises library</Text>
           
              <Text style={[Common.lightBodyText, Common.centeredText]}>Discover exercises sorted by muscles and type. Most of the exercises come with videos, which will help you to grow.
              </Text>

              

              <TouchableOpacity onPress={ () => {
                this.props.navigator.push('exercises') } }
                style={Common.lightButtonRounded}>
                <Text style={Common.lightActionTitle}>Explore Exercises</Text>
              </TouchableOpacity>
          </Image>
      </View>
    );
    }
  }