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

        };
    }

    componentDidMount() {
      const likes = this.props.postData.likes;
      this.setState({
        liked: likes.includes(auth.currentUser.email),

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

    render() {
        return (
    <View style={styles.postCard}>
        <Text style={styles.postTitle}>{this.props.postData.owner}</Text>
        <Text style={styles.postText}>{this.props.postData.description}</Text>

        <Text style={styles.likesCount}>Likes: {this.props.postData.likes.length}</Text>

            <Pressable onPress={() => this.actualizarLikes()} style={styles.commentButton}>
                <FontAwesome
                name={this.state.liked ? 'heart' : 'heart-o'}
                size={26}
                color={this.state.liked ? 'red' : 'gray'}
                />
            </Pressable>

            

            {/* <Pressable onPress={() => this.iraComentarios()} style={styles.commentButton}>
                <Text style={styles.commentButtonText}>Ir a comentarios</Text>
            </Pressable> */}


          {this.props.origen !== "Profile" && (
            <Pressable onPress={() => this.iraComentarios()} style={styles.commentButton}>
             <Text style={styles.commentButtonText}>Ir a comentarios</Text>
           </Pressable>
      )}
    </View>
        );}
    }


const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
    textAlign: 'center',
  },
  postText: {
    fontSize: 18, 
    color: '#5D6D7E',
    textAlign: 'center',
    marginBottom: 10,
  },
  likesCount: {
    fontSize: 14,
    color: '#7D7D7D',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  commentButton: {
    backgroundColor: '#6C63FF', 
    paddingVertical: 10,
    paddingHorizontal: 40, 
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  commentButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default Post;