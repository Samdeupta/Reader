import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Audio} from 'expo-av';

export default class PhonicSoundButton extends React.Component {
  constructor(props){
    super(props);

    this.state={
      pressedButtonIndex: ''
    }
  }
  playSound= async soundChunk =>{
    var soundLink= 'https://whitehatjrcontent.s3.ap-south-1.amazonaws.com/phones/' + soundChunk + '.mp3';
    await Audio.Sound.createAsync(
      {
        uri: soundLink
      },
      {
        shouldPlay: true
      }
      )
  }

  render(){
    return(
      <TouchableOpacity
        style= {this.props.buttonIndex == this.state.pressedButtonIndex ? [styles.chunkButton,{backgroundColor: 'red'}] : [styles.chunkButton,{backgroundColor: '#123456'}]}
        onPress= {()=>{
          this.setState({pressedButtonIndex: this.props.buttonIndex})
          this.playSound(this.props.soundChunk)
        }}
      >
        <Text style= {styles.displayText}>{this.props.wordChunk}</Text>
      </TouchableOpacity>
    )
  }
}

const styles= StyleSheet.create({
  displayText: {
    alignSelf: 'center',
    alignText: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  chunkButton: {
    width: 60,
    height: 60,
    marginTop: 10,
    alignSelf: 'center',
    alignText: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#123456'
  }
})