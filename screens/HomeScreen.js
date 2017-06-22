import React, { Component } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import { MonoText } from '../components/StyledText';
import CTACard from '../components/CTACard';
import ProgramsList from '../components/ProgramsList';
import Colors from '../constants/Colors';
import PromoCard from '../components/PromoCard';
import PromoCard2 from '../components/PromoCard2';
import HeroCard from '../components/HeroCard';
import * as firebase from 'firebase';
import Stats from '../components/Stats';
import Database from '../api/database';
import Common from '../constants/common';
import I18n from 'react-native-i18n';
import fi from '../constants/fi';
I18n.locale = "fi";
I18n.fallbacks = true;
I18n.translations = {fi};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.loadingOFF = this.loadingOFF.bind(this);
    this.state = {
      uid: '',
      hasProgram: false,
      ownProgram: '',
      programName: '',
      isLoading: true,
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title: I18n.t('Home'),
    },
  };
  loadingOFF() {
      this.setState({
      loading: false,
    })
  }

componentDidMount() {
    this.retrieveUserId();
    this.listenForExercises();
}

  listenForExercises() {
    firebase.database().ref().child('exercises').on('value', (snap) => {
      // get children as an array
      var exercises = [];
      
      snap.forEach((child) => {
        exercises.push({
          name: child.val().name,
          muscles: child.val().muscles,
          type: child.val().type || 'basic',
          photo: child.val().photo,
          video: child.val().video || 'https://',
          _key: child.key.slice(2),
        });
      });
      AsyncStorage.setItem('exercises', JSON.stringify(exercises));
    });
    
  }

renderCard = () => {
  if (this.state.hasProgram) {
    return(
      <View>
        <HeroCard 
          program={this.state.ownProgram}
          programName={this.state.programName}
          doneThisWeek={6}
          exercisesThisWeek={12}/>
      </View>
    );
  }
  else {
    return (
      <View>
        <CTACard/>
      </View>
    )
  }
}

renderBoard = () => {
  if (this.state.hasProgram) {
    return(
      <View style={Common.sectionBorder}>
        <View style={Common.container}>
          <Text style={Common.darkTitleH1}>{I18n.t('ExercisesThisWeek')}</Text>
        </View>
        <Stats
          loadingOFF={this.loadingOFF}
          />
      </View>
    );
  }
  else {
    return (
      <View>
        <View style={Common.container}>
          <Text style={Common.darkTitleH1}>{I18n.t('Discover')}</Text>
        </View>
        <View style={Common.centered}>
          <PromoCard2/>
          <PromoCard/>
        </View>
      </View>
    )
  }
}

retrieveUserId() {
  //let that = this;
      let renderAction = setInterval(() => {
        if ( firebase.auth().currentUser !== null ) {
            clearInterval(renderAction);
            let user = firebase.auth().currentUser;
            let uid = user.uid;
            this.setState({uid});
            let path = "/user/" + uid + "/ownProgram";
            firebase.database().ref(path).on('value', (snap) => {
              if (snap.val().hasProgram) { 
                this.setState({hasProgram: true});
                this.setState({ownProgram: snap.val()});
                this.setState({isLoading: false});
                return true;
                
              }
              else {
                this.setState({hasProgram: false});
                this.setState({isLoading: false});
                return false
              };
            }, (e) => {console.log(e)})
            return firebase.auth().currentUser.uid;
        }
      }, 200);

}
  render() {
    return (
     <ScrollView>
       {this.renderCard()}
       <TouchableOpacity onPress={() => {console.log(this.state.programName)}}><Text style={{fontSize:24, color:'red'}}>123</Text></TouchableOpacity>
        <View style={Common.container}>
            <Text style={Common.darkTitleH1}>{I18n.t('PopularPrograms')}</Text>
       </View>
       <ProgramsList style={Common.sectionBorder}/>

         {this.renderBoard()}
        {this.state.isLoading && <View style={styles.loading}>
            <ActivityIndicator
                animating
                size="large"
            />
        </View>}
      </ScrollView>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#000000',
    letterSpacing: 0,
    marginVertical: 15,
    marginLeft: 15,
  },
   bgRectangular: {
    marginBottom: -300,
    height: 300,
    width: 700,
    alignSelf: 'stretch',
    backgroundColor: Colors.tintColor,
    transform: [
      {skewY: '170deg'}
    ],
    zIndex: -1,
    marginVertical: 40,
    marginHorizontal: -100
  },
  loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
    }
  
});