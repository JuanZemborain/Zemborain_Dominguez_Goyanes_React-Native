import React, { Component } from 'react';
import { Pressable } from 'react-native';
import { View, Text, TextInput, StyleSheet } from 'react-native';
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

         if(this.state.username.length == 0){
            this.setState({error: "debe crear un nombre de usuario"})
            return;
        }

        if (this.state.username.length < 4){
            this.setState({error: "el nombre de usuario tiene que tener al menos 4 caracteres"})
            return;

        }

         if (this.state.username.length > 20){
            this.setState({error: "el nombre de usuario no puede superar lso 20 caracteres"})
            return;

        }

       


         auth.createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then((response)=>{
            
            console.log(response);

             auth.signOut()
            
            db.collection("users").add({username: this.state.username, email:this.state.email})

           
        })
        .then((res) => {
            this.props.navigation.navigate("Login")
            console.log(res);
            
            console.log(auth.currentUser)
        })
        
        .catch( error => {
            console.log(error);
            
            this.setState({error: error.message})
        })
        
        
        
    }

  

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}> Formulario de registro </Text>

                <TextInput
                        style={styles.input}
                        keyboardType="email-address"
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(text) => this.setState({ email: text })}
                    />
                
                <TextInput
                        style={styles.input}
                        placeholder="Nombre de usuario"
                        value={this.state.username}
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                
                   <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                    />

                    <Text style={styles.error}> {this.state.error}</Text>

                     <Pressable onPress={() => this.OnSubmit()} style={styles.button}>
                        <Text style={styles.buttonText} >Crear Cuenta</Text>
                    </Pressable>

                    <Pressable onPress={() => this.props.navigation.navigate("Login")}>
                        <Text style={styles.linkText} >Ya tengo cuenta </Text>
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
});

export default Register