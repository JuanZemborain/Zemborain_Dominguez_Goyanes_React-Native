import React, { Component } from 'react';
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native';
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
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 30,
    alignSelf: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default NuevoPost;