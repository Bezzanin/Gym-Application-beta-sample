import React, { Component } from "react";
import { View, Text, ListView, FlatList } from "react-native";
import {Grid, Col, Row} from "react-native-elements";
import Common from "../constants/common";
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};


class DashboardExercisesList extends Component {
  constructor(props){
    super(props);
    this.state = {
        dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  render() {
    return (
        <View>
            <View style={[Common.sectionBorder, {marginVertical: 7}]}/>
            <Grid>
            <Row>
                    <Col size={3}><View style={{paddingRight: 20}}><Text style={Common.darkBodyText}>{I18n.t('Exercise')}</Text></View></Col>
                    <Col size={1}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText}>{I18n.t('Reps').toLowerCase()}</Text></View></Col>
                    <Col size={1}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText}>{I18n.t('Weight').toLowerCase()}</Text></View></Col>
                </Row>
            </Grid>
            <Grid>
                
                <FlatList
                data = {this.props.data}
                renderItem={this._renderItem}
                />
            </Grid>
        </View>
    );
  }
  goToSomewhere = () => {
    this.props.navigator.push('programs');
  }
_renderItem = ({item}) => (
      
        <Row>
            <Col size={3}><View style={{paddingRight: 20}}><Text style={Common.darkBodyText2}>{I18n.t(item.name.replace(/[^A-Z0-9]+/ig, ''))}</Text></View></Col>
            <Col size={1}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>3</Text></View></Col>
            <Col size={1}><View style={{alignItems: 'flex-end'}}><Text style={Common.darkBodyText2}>40 kg</Text></View></Col>
        </Row>
    );
  
}
export default DashboardExercisesList;


