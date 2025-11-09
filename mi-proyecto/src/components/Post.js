import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            liked: false,
            likesCount: 0
        };
    }

    componentDidMount() {
      const likes = this.props.postData.likes;
      this.setState({
        liked: likes.includes(auth.currentUser.email),
        likesCount: likes.length
      })
    }

    actualizarLikes() {
      if (this.state.liked) {
        db.collection('posts')
          .doc(this.props.postId)
          .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
          })
          .then(() => {
            this.setState({
              liked: false,
              likesCount: this.state.likesCount - 1
            });
          })
          .catch(error => console.log(error));
      } else {
        db.collection('posts')
          .doc(this.props.postId)
          .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
          })
          .then(() => {
            this.setState({
              liked: true,
              likesCount: this.state.likesCount + 1
            });
          })
          .catch(error => console.log(error));
      }
    }

    iraComentarios() {
        this.props.navigation.navigate('Comentario', {
            postId: this.props.postId
        });
    }

    borrarPosteo(){
      db.collection("posts").doc(this.props.postId).delete()
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.owner}>{this.props.postData.owner}</Text>
            <Text style={styles.description}>{this.props.postData.description}</Text>

            <Text style={styles.likesCount}> Likes: {this.state.likesCount}</Text>
            {this.props.origen == "Home" ? 
            <React.Fragment>
              <Pressable onPress={() => this.actualizarLikes()} style={styles.button}>
              <Text style={styles.buttonText}> {this.state.liked ? 'Quitar like' : 'Like'} </Text>
            </Pressable>
            <Pressable onPress={() => this.iraComentarios()} style={styles.button}>
              <Text style={styles.buttonText}> Ir a comentarios </Text>
            </Pressable>
            </React.Fragment>
            : null}

            {this.props.origen == "Profile" ? 
            
              <Pressable onPress={() => this.borrarPosteo()} style={styles.button}>
              <Text style={styles.buttonText}> borrar posteo </Text>
            </Pressable> :null }
        </View>
        );
    }
    }

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    padding: 10,
    marginVertical: 5
  },
  owner: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  description: {
    fontSize: 16
  },
  likesCount: {
    marginTop: 10,
    fontStyle: 'italic'
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007bff',
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#007bff'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default Post;