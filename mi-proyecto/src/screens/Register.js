import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import {auth, db} from "../firebase/config"

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
           email : "",
           username:  "",
           password: "",
           error: "" 
        }
    }

    OnSubmit(){
        console.log(this.state.email);
        console.log(this.state.username);
        console.log(this.state.password);

        if (this.state.username.length < 4){
            this.setState({error: "el nombre de usuario tiene que tener al menos 4 caracteres"})

        }

        if(this.state.username.length == 0){
            this.setState({error: "debe crear un nombre de usuario"})
        }


         auth.createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((response)=>{
           db.collection("users").add({username: this.state.username, email:this.state.email})
        })
        .then(() => {
            this.props.navigation.navigate("Login")
        })
        .catch( error => {
            console.log(error);
            
            this.setState({error: error.message})
        })
        
        
        
    }

  

    render(){
        return(
            <view>
                <Text> Formulario de registro </Text>

                <TextInput
                        keyboardType="email-address"
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                
                <TextInput
                        placeholder="Nombre de usuario"
                        value={this.state.username}
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                
                   <TextInput
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <Text> {this.state.error}</Text>

                     <Pressable onPress={() => this.OnSubmit()}>
                        <Text>Ir a Login</Text>
                    </Pressable>

                    

                
            </view>
        )
    }
}

export default Register