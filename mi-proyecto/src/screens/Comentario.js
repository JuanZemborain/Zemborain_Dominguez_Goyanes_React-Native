import React, { Component } from 'react';
import { View, Text, Pressable, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Comentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: '',
      comentarios: [],
      loading: true
    };
  }

  componentDidMount() {
    const postId = this.props.route.params.postId;
    db.collection('posts')
      .doc(postId)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          this.setState({ comentarios: data.comentarios || [], loading: false });
        }
      });
  }

  guardarComentario() {
    const postId = this.props.route.params.postId;
    if (this.state.comentario.length === 0) return;
    
    db.collection('posts')
      .doc(postId)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          texto: this.state.comentario
        })
      })
      .then(() => {
        this.setState({ comentario: '' });
      })
      .catch(error => console.log(error));
  }

  render() {

    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6C63FF" />
          <Text style={styles.texto}>Cargando comentarios...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Comentarios</Text>

        <Pressable onPress={() => this.props.navigation.navigate('HomeMenu', { screen: 'Home' })} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>

        <FlatList
          data={this.state.comentarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contenedorComentario}>
              <Text style={styles.comentarioOwner}>{item.owner}</Text>
              <Text>{item.texto}</Text>
            </View>
          )}
        />

        <View style={styles.campo}>
          <TextInput
            placeholder="Escribí un comentario..."
            value={this.state.comentario}
            onChangeText={text => this.setState({ comentario: text })}
            style={styles.input}
          />
          <Pressable onPress={() => this.guardarComentario()} style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  contenedorComentario: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    alignItems: 'center',
  },
  comentarioOwner: {
    fontWeight: 'bold',
    marginBottom: 2
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 8
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
  },
  texto: {
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginRight: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Comentario;
