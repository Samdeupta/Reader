import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import {Header} from 'react-native-elements';
import db from './localDb'
import PhonicSoundButton from './components/phonicSoundButton';

export default class App extends React.Component {
  constructor(){
    super();
    this.state= {
      text: "",
      chunks: [],
      phonicSounds: []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor = {'#123456'}
          centerComponent = {{text: 'Reader', style:{color: 'white', fontSize: 30, fontWeight: 'bold', fontFamily: 'Calibri'}}}/>

          <Image
            style= {styles.imageIcon}
            source= {require('Icon.png')}
          />
          <TextInput
            style= {styles.inputBox}
            onChangeText= {(text)=>{
              this.setState({text:text});
            }} 
            value= {this.state.text}/>
            
            <TouchableOpacity
              style= {styles.readButton}
              onPress= {()=>{
                var word= this.state.text.toLowerCase().trim()
                db[word]?(
                this.setState({chunks:db[word].chunks}),
                this.setState({phonicSounds:db[word].phones})
                ): 
                Alert.alert("Not in Database");
              }}
            >
              <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>Show</Text>
            </TouchableOpacity>
            <View>
              {this.state.chunks.map((item,index)=>{
                return(
                  <PhonicSoundButton 
                    wordChunk= {this.state.chunks[index]}
                    soundChunk= {this.state.phonicSounds[index]}
                    buttonIndex= {index}
                  />
                ) 
              })}
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  inputBox: { 
    marginTop: 10,
    width: '80%',
    alignSelf: 'center', 
    height: 40, textAlign: 'center', 
    borderWidth: 2, 
    outline: 'none' 
  },
  readButton: {
    width: 100,
    height: 60,
    alignSelf: 'center',
    alignText: 'center',
    paddingTop: 20,
    marginTop: 20,
    backgroundColor: '#123456',
    borderRadius: 15
  },
  imageIcon: {
    width: 150,
    height: 150,
    margin: 20,
    alignSelf: 'center'
  }
});
