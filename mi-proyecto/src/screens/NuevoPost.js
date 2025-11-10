import React, { Component } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet, Image, ImageBackground } from 'react-native';
import { db, auth } from '../firebase/config';

class NuevoPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: null
    };
  }

  onSubmit() {
    db.collection('posts').add({
        createdAt: Date.now(),
        owner: auth.currentUser.email,
        description: this.state.description,
        likes: [],
        comentarios: []
    })
    .then(() => {
      this.setState({ description: '' });
      this.props.navigation.navigate('HomeMenu');
    })
    .catch(error => {
      console.log(error);
      this.setState({ error: 'Error al crear el post' });
    });
  }

  render() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Nuevo Post</Text>
       
        <Image
         source={{uri: 'https://e1.pxfuel.com/desktop-wallpaper/538/178/desktop-wallpaper-colorful-music-background.jpg',}} 
         style={styles.backgroundImage}
        />

        <TextInput
          style={styles.input}
          placeholder="Escribí tu mensaje..."
          value={this.state.description}
          onChangeText={text => this.setState({ description: text })}
        />

        <Pressable onPress={() => this.onSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>

        {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
      </View>

      
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    padding: 25,
    backgroundImage: "url(https://i.pinimg.com/736x/6c/d9/3b/6cd93b821fcc13847d63d97184870c19.jpg)"

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#DADADA",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
    fontSize: 16,
    color: "#34495E",
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
  backgroundImage: {
  position: 'absolute',
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
});

export default NuevoPost;