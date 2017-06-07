import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Layout from '../constants/Layout'
import {Grid, Col, Row} from 'react-native-elements';
import Common from '../constants/common';
import BigTag from '../components/BigTag';
class LogItem extends Component {
  render() {
    return (
      <View style={[Common.container, Common.sectionBorder]}>
      <View style={[Common.inlineContainer, Common.brightStats, Common.centered, Common.shadowBright]}>
                   <Grid>
                        <Col>
                            <BigTag
                                title='total exercises'
                                content={'34'}
                                color='#fff'
                                />
                        </Col>
                        <Col>
                            <BigTag
                            title='workouts done'
                            content='22'
                            color='#fff'/>
                        </Col>
                        <Col>
                            <BigTag
                                title='workouts done'
                                content='22'
                                color='#fff'/>
                        </Col>
                    </Grid> 
                </View>
                </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#CE0707',
    borderWidth: 0,
    borderRadius: 5,
    paddingHorizontal: 14,
    width: Layout.window.width * 0.9,
    paddingTop: 15,
    paddingBottom: 20,
    marginHorizontal: 15,
    shadowColor: "#CE0707",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0
    },
    marginBottom: 20,
  },

  title: {
    fontSize: 12,
    color: '#FFFFFF',
    margin: 2,
  },

  number: {
    fontSize: 25,
    color: '#FFFFFF',
    margin: 2,
  },
});

export default LogItem;


