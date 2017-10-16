import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import I18n from 'ex-react-native-i18n'
import fi from '../constants/fi';
import en from '../constants/en';
I18n.fallbacks = true;
I18n.translations = {fi, en};

class Filters extends Component {
  render() {
    const { filter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter === "ALL" && styles.selected]} onPress={() => this.props.onFilter("ALL")}>
            <Text style={[styles.filterText, filter ==="ALL" && styles.selectedText]}>{I18n.t('All')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, styles.filterMiddle, filter === "ISOLATION" && styles.selected]} onPress={() => this.props.onFilter("ISOLATION")}>
            <Text style={[styles.filterText, filter ==="ISOLATION" && styles.selectedText]}>{I18n.t('isolation')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter === "BASIC" && styles.selected]} onPress={() => this.props.onFilter("BASIC")}>
            <Text style={[styles.filterText, filter === "BASIC" && styles.selectedText]}>{I18n.t('basic')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#CE0707",
    borderWidth: 1,
    borderRadius: 5
  },
  filters: {
    flexDirection: "row",
    padding: 0
  },
  filter: {
    flex: 1,
    paddingVertical: 5,
    alignItems: 'center'
  },
  filterMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#CE0606"
  },
  filterText: {
    color: '#CE0606',
    fontSize: 14
  },
  selected: {
    backgroundColor: '#CE0606',
  },
  selectedText: {
    color: '#fff'
  }
})
export default Filters;