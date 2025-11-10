import React, { Component } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import {auth} from "../firebase/config"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: ""
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user !=null){
                this.props.navigation.navigate("NavegacionTab");
            }
        })
    }
    OnSubmit() {
        console.log(this.state.email);
        console.log(this.state.password);
            auth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((response) => {
            
            this.props.navigation.navigate("NavegacionTab");
        })
        .catch(error => {
            console.log(error);
            
            this.setState({error: error.message})
        })

    }

    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Formulario de login </Text>

                <TextInput
                    style={styles.input}
                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

               

                <Pressable onPress={() => this.OnSubmit()} style={styles.button}>

                    <Text style={styles.buttonText}> Login </Text>
                </Pressable>

                 <Pressable onPress={() => this.props.navigation.navigate("Register")}>

                    <Text style={styles.linkText}> ir a Registrarse </Text>
                </Pressable>

                


            </View>
        )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA', // Fondo claro grisáceo
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50', // Gris azulado oscuro
    marginBottom: 25,
  },
  input: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderColor: '#DADADA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#34495E',
  },
  button: {
    backgroundColor: '#6C63FF', // Violeta suave
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  linkText: {
    color: '#6C63FF',
    marginTop: 15,
    fontSize: 15,
  },
});

export default Login 