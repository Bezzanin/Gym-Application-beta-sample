import React, { Component } from "react";
import { View, Text, ListView } from "react-native";
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
  componentDidMount() {
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.props.data)
      })
  }
  render() {
    return (
        <View>
            <Text>Exercises</Text>
            <Grid>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderItem.bind(this)}
                />
            </Grid>
        </View>
    );
  }
  goToSomewhere = () => {
    this.props.navigator.push('programs');
  }
_renderItem(item) {
    return (
      
        <Row>
            <Col><Text style={Common.darkBodyText}>{item.name}</Text></Col>
            <Col><Text></Text></Col>
            <Col><Text></Text></Col>
        </Row>
    );
  }
}

export default DashboardExercisesList;


