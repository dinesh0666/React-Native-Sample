import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
TouchableOpacity,
Button,
Alert,
ImageBackground
} from "react-native";
import backImage from "./background.jpg"
// const backImage = require('background.jpg');


function Separator() {
  return <View style={styles.separator} />;
}

export default class App extends React.Component {

static navigationOptions = ({ navigation }) => {
return {
  title: "Source Listing",
  headerStyle: {backgroundColor: "#fff"},
  headerTitleStyle: {textAlign: "center",flex: 1}
 };
};
constructor(props) {
 super(props);
 this.state = {
   loading: true,
   dataSource:{}
  };
}
componentDidMount(){
fetch("https://node-red-zcytl.eu-gb.mybluemix.net/hello-data")
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   loading: false,
   dataSource: responseJson
  })
})
.catch(error=>console.log(error)) //to catch the errors if any
}
 ledOff = () => {
  let url = 'https://node-red-zcytl.eu-gb.mybluemix.net/LED-off'
  fetch(url)
   .then(response => response.text())
   .then(data => Alert.alert("LED is OFF now"));
  }
  ledOn = () => {
    console.log('ledOn');
    let url = 'https://node-red-zcytl.eu-gb.mybluemix.net/LED-on';
     fetch(url)
     .then(response => response.text())
     .then(data => Alert.alert("LED is ON now"));
    }
render(){
  const temp = this.state.dataSource && this.state.dataSource;
  var obj = "The current temperature is " + temp[Object.keys(temp)[0]];
return(
 <View style={styles.container}>
   <ImageBackground source={backImage} style={styles.backgroundImage} >
    <Text style={styles.lightText}>{obj}</Text>
        <Separator />
          <Button
            title="LED ON"
            onPress={() => this.ledOn()}
          />
            <Separator />
          <Button
            title="LED OFF"
            onPress={() => this.ledOff()}
          />
        </ImageBackground>
</View>
)}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
   },
   container2: {
    flex: 1,
    flexDirection:'row-reverse',
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  list:{
    paddingVertical: 6,
    margin: 5,
    backgroundColor: "#fff"
   },
   lightText:{
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
   },
   separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});