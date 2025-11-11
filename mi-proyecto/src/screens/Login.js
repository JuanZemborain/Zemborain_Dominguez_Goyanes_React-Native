import React, { Component } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import {auth} from "../firebase/config"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: "",
            loading: false
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if (user){
                console.log(user);
                
                this.props.navigation.navigate("NavegacionTab");
            }
        })
    }
    OnSubmit() {
        console.log(this.state.email);
        console.log(this.state.password);
        auth.signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((response) => {
            this.setState({loading: false});
            this.props.navigation.navigate("NavegacionTab");
        })
        .catch(error => {
            console.log(error);
            
            this.setState({error: error.message})
        })

    }

    
    render() {

        if (this.state.loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6C63FF" />
                    <Text style={styles.texto}>Iniciando sesión...</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}> Login </Text>

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
    backgroundColor: '#F7F8FA', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundImage: "url(https://png.pngtree.com/background/20250110/original/pngtree-music-guitar-simple-and-elegant-picture-image_15185851.jpg)"
  ,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50', 
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
    backgroundColor: '#6C63FF', 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 10,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
    },
    texto: {
        marginTop: 10,
    }
});

export default Login 