import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {Grid, Col, Row} from 'react-native-elements';
import Common from '../constants/common';
import { withNavigation } from '@expo/ex-navigation';
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en'; import ru from '../constants/ru';
I18n.fallbacks = true;
I18n.translations = {fi, en, ru};

@withNavigation
export default class PromoCard extends Component {
    render() {
    return (
      <View style={[Common.promotionCard,Common.shadowMedium]}>
        <Image source={require('../assets/images/CTA2.png')} 
        style={[Common.centered, Common.imageCardCover, Common.shadowMedium]}>


              <Text style={Common.lightTitleH2}>{I18n.t('DiaryPromoTitle')}</Text>
           
              <Text style={[Common.lightBodyText, Common.centeredText]}>{I18n.t('DiaryPromo')}</Text>

              

              <TouchableOpacity onPress={ () => {
                this.props.navigator.push('diary') } }
                style={Common.lightButtonRounded}>
                <Text style={Common.lightActionTitle}>{I18n.t('CheckOut')}</Text>
              </TouchableOpacity>
          </Image>
      </View>
    );
    }
  }