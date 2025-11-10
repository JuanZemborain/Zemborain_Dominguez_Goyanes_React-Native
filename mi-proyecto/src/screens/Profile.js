import React, { Component } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';
import logo from "../../assets/logo.png.png"

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      username: ''
    };
  }

  componentDidMount() {
    db.collection('posts').where("owner", "==", auth.currentUser.email).onSnapshot(
      (docs) => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id:
              doc.id,
            data: doc.data()
          });
        });
        this.setState({ posteos: posts });
        console.log('Posteos:', this.state.posteos);
      },
      (error) => console.log(error)
    );

    db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
      (docs) => {
        docs.forEach(doc => {
          const userData = doc.data();
          this.setState({ username: userData.username });
        });
      },
      (error) => console.log(error)
    );
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => console.log(error));
  }

  render() {

    if (!auth.currentUser) {
      return <Text>Cargando perfil...</Text>
    }

    return (
      <View style={styles.container}>

         <View style={styles.header}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.title}>Mi Perfil 🎵</Text>
            </View>
        <Text style={styles.subtitle}> Usuario: {this.state.username} </Text>
        <Text style={styles.subtitle}> Email: {auth.currentUser.email} </Text>

        <Text style={styles.postSectionTitle}> Mis Posteos: </Text>

        {this.state.posteos.length === 0 ? <Text style={styles.subtitle}>No tenés posteos todavía.</Text> : (
          <FlatList
            data={this.state.posteos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Post postData={item.data} postId={item.id} origen={"Profile"} />
            )}
          />
        )}


        <Pressable onPress={() => this.logout()} style={styles.button}>
          <Text style={styles.buttonText}> Logout </Text>
        </Pressable>

      </View>
    )
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
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  postSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff8c00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    textAlign: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 20,
   },

  logo: {
    width: 150,
    height: 150,
    marginRight: 10,
    borderRadius: 40, 
  },
});

export default Profile