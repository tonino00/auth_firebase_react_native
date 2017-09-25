import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Header, Icon, Spinner } from 'native-base';
import firebase from 'firebase';

class LoginForm extends Component {
	state = { email: '', password: '', error: '', loading: false };
	onButtonPress() {
		const { email, password } = this.state;

		this.setState({ error: '', loading: true});

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(this.onLoginSuccess.bind(this))
				.catch(this.onLoginFail.bind(this));
			});
	}

	onLoginFail() {
		this.setState({ error: 'Authentification Failed.', loading: false});
	}

	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: ''
		});
	}

	renderButton() {
		if (this.state.loading) {
			return <Spinner color='#ff1493'  size="small" />;
		}
		return(
			<Button block
				onPress={this.onButtonPress.bind(this)}
				style={{marginTop:20  ,backgroundColor:'#1e90ff', margin:15 , width:320}}
				>
				<Text style={styles.titleButton}> Log in</Text>
			 </Button>
		);
	}

	render() {
		return (

			<View style={styles.container}>
				<Container>
					<Content>
						<Form>
							<Item floatingLabel>
									<Label>Email</Label>
									<Input 
										autoCorrect={false}
										value={this.state.email}
										keyboardType="default" 
										onChangeText={email => this.setState({ email })}
									 />
							</Item>
							<Item floatingLabel>
									<Label>Password</Label>
									<Input
										secureTextEntry={true}
										value={this.state.password}
										onChangeText={password => this.setState({ password })} 
										 />
							</Item>
							<Text style={styles.errorTextStyle}>
								{this.state.error}
							</Text>
							<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:15}}>
								{this.renderButton()}
							</View>
						</Form>
					</Content>
				</Container>
			</View>

			);
	}
}

export default LoginForm;

	const styles = StyleSheet.create({

	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	titlePage: {
		color:'#FFF',
		fontSize:16,
		alignItems:'center',
		textAlign:'center'
	},
	titleButton: {
		color:'#FFF',
		fontSize:14,
		alignItems:'center',
		textAlign:'center',
	},

	text: {
		color:'#5C5E5D',
		fontSize:14,
		alignItems:'center',
		textAlign:'center',
	},
	errorTextStyle : {
		fontSize:20,
		alignSelf: 'center',
		color:'#ff1493'
	}
});