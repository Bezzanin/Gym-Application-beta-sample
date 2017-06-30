import React from 'react';
import {View,
        Text,
        Picker,
        TouchableOpacity, } from 'react-native';
import Common from '../constants/common';
export default class LoadPicker extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          data: '',
          reps: '5',
          weight: '25',
      }
  }

  componentDidMount(){
      this.props.sendData(this.state.reps, this.props.index);
      this.props.sendWeight(this.state.weight, this.props.index);
  }
  render() {

    return (
      <View>
       <View style={{flexDirection: 'row'}}>
        <Picker
            style = {{flex: 1, height: 200}}
            selectedValue={this.state.reps}
            onValueChange={(reps) => {
               this.props.sendData(reps, this.props.index);
               this.setState({reps})
            }}>
            <Picker.Item style={{fontSize: 10}} label="1 rep"   value="1" />
            <Picker.Item style={{fontSize: 10}} label="2 reps"  value="2" />
            <Picker.Item style={{fontSize: 10}} label="3 reps"  value="3" />
            <Picker.Item style={{fontSize: 10}} label="4 reps"  value="4" />
            <Picker.Item style={{fontSize: 10}} label="5 reps"  value="5" />
            <Picker.Item style={{fontSize: 10}} label="6 reps"  value="6" />
            <Picker.Item style={{fontSize: 10}} label="7 reps"  value="7" />
            <Picker.Item style={{fontSize: 10}} label="8 reps"  value="8" />
            <Picker.Item style={{fontSize: 10}} label="9 reps"  value="9" />
            <Picker.Item style={{fontSize: 10}} label="10 reps" value="10"/>
            <Picker.Item style={{fontSize: 10}} label="11 reps" value="11"/>
            <Picker.Item style={{fontSize: 10}} label="12 reps" value="12"/>
            <Picker.Item style={{fontSize: 10}} label="13 reps" value="13"/>
            <Picker.Item style={{fontSize: 10}} label="14 reps" value="14"/>
            <Picker.Item style={{fontSize: 10}} label="15 reps" value="15"/>
            <Picker.Item style={{fontSize: 10}} label="16 reps" value="16"/>
            <Picker.Item style={{fontSize: 10}} label="17 reps" value="17"/>
            <Picker.Item style={{fontSize: 10}} label="18 reps" value="18"/>
            <Picker.Item style={{fontSize: 10}} label="19 reps" value="19"/>
            <Picker.Item style={{fontSize: 10}} label="20 reps" value="20"/>
        </Picker>
        <Picker
            style = {{flex: 1, height: 200}}
            selectedValue={this.state.weight}
            onValueChange={(weight) => {
                this.props.sendWeight(weight, this.props.index);
                this.setState({weight})
            }}>
            <Picker.Item style={{fontSize: 14}} label="10kg" value="10"/>
            <Picker.Item style={{fontSize: 14}} label="15kg" value="15"/>
            <Picker.Item style={{fontSize: 14}} label="20kg" value="20"/>
            <Picker.Item style={{fontSize: 14}} label="25kg" value="25"/>
            <Picker.Item style={{fontSize: 14}} label="30kg" value="30"/>
            <Picker.Item style={{fontSize: 14}} label="35kg" value="35"/>
            <Picker.Item style={{fontSize: 14}} label="40kg" value="40"/>
            <Picker.Item style={{fontSize: 14}} label="45kg" value="45"/>
        </Picker>
       </View>
      </View>
    );
  }
}
