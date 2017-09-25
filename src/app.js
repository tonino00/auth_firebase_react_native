import React, {Component} from 'react';
import {View, StyleSheet, StatusBar } from 'react-native';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import { Header , Container , Content, Body , Title , Left, Right, Button, Icon, Text, Spinner } from 'native-base';

class App extends Component {
	state = { loggedIn: null};
	componentWillMount() {
		firebase.initializeApp({
    apiKey: "AIzaSyA58-lpFdQwBq6XnHNKvNyoDC6onvjH0HY",
    authDomain: "authentification-c7284.firebaseapp.com",
    databaseURL: "https://authentification-c7284.firebaseio.com",
    projectId: "authentification-c7284",
    storageBucket: "authentification-c7284.appspot.com",
    messagingSenderId: "380849947550"
  });
		firebase.auth().onAuthStateChanged((user) => {
			if (user ) {
				this.setState( { loggedIn : true});
			} else {
				this.setState( { loggedIn: false })
			}
		});
	}

	renderContent() {

		switch (this.state.loggedIn) {
			case true:
				return  (<Button block style={styles.logoutButtonStyle} onPress={()=> firebase.auth().signOut()}><Text> Log out</Text></Button> 
					);
			case false:
				return <LoginForm />;
			default:
				return <Spinner  size="large" />;
		}
	}

	render() {
		return (
				<Container>
				<Header style={{backgroundColor:"#ff1493", height:60}}>
				  <StatusBar
				     backgroundColor='#1e90ff'
				   />
				  <Left>
				    <Button transparent>
				      <Icon name = 'menu'/>
				    </Button>
				  </Left>
				  <Body>
				    <Text style={styles.titlePage}>Authentification</Text>       
				  </Body>
				</Header>
				<Content>
					{this.renderContent()}
				</Content>
				</Container>
			)
	};
}

export default App;

  const styles = StyleSheet.create({

  titlePage: {
    color:'#FFF',
    fontSize:16,
    fontWeight:'600',
    textAlign:'center',
    alignItems:'center',
  },

  logoutButtonStyle: {
  	marginTop:20,
  	margin:15,
  	width:320,
  	backgroundColor:'#1e90ff',
  }

});