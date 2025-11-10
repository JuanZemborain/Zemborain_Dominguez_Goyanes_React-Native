import React, { Component } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
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
            <view>
                <Text> Formulario de login </Text>

                <TextInput

                    keyboardType='email-address'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />

               

                <Pressable onPress={() => this.OnSubmit()}>

                    <Text> Login </Text>
                </Pressable>

                 <Pressable onPress={() => this.props.navigation.navigate("Register")}>

                    <Text> ir a Registrarse </Text>
                </Pressable>

                


            </view>
        )
    }

}

export default Login 