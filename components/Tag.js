import React, { Component } from "react";
import { View, Text } from "react-native";
import Common from '../constants/common';
import Layout from '../constants/Layout';

export default class Tag extends Component {
  render() {
    return (
      <View style={{marginBottom: 2, marginRight: Layout.width.xs}}>
        <Text style={this.props.color === '#000' ? Common.darkTagTitle : [Common.lightTagTitle]}>{this.props.title}</Text>
        <Text style={[Common.darkTitleH3, {color: this.props.color, lineHeight: 18}]}>{this.props.content}</Text>
      </View>
    );
  }
  
}