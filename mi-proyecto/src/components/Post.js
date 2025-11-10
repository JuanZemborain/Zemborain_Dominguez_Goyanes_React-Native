import React, { Component } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons'

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
<View style={styles.postCard}>
  <Text style={styles.postTitle}>{this.props.postData.owner}</Text>
  <Text style={styles.postText}>{this.props.postData.description}</Text>

  <Text style={styles.likesCount}>Likes: {this.state.likesCount}</Text>

  {this.props.origen === "Home" ? (
    <>
      <Pressable onPress={() => this.actualizarLikes()} style={styles.commentButton}>
        <FontAwesome
          name={this.state.liked ? 'heart' : 'heart-o'}
          size={26}
          color={this.state.liked ? 'red' : 'gray'}
        />
      </Pressable>

      <Pressable onPress={() => this.iraComentarios()} style={styles.commentButton}>
        <Text style={styles.commentButtonText}>Ir a comentarios</Text>
      </Pressable>
    </>
  ) : null}

  {this.props.origen === "Profile" ? (
    <Pressable onPress={() => this.borrarPosteo()} style={styles.commentButton}>
      <Text style={styles.commentButtonText}>Borrar posteo</Text>
    </Pressable>
  ) : null}
</View>
        );
    }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFEFF",
    padding: 15,
  },
  postCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 6,
  },
  postText: {
    fontSize: 16,
    color: "#5D6D7E",
  },
  commentButton: {
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  commentButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "500",
  },
});

export default Post;