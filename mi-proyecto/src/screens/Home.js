import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';
import logo from "../../assets/logo.png.png"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: []
    };
  }

  componentDidMount() {
    console.log("estamos en home");
    
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      (docs) => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({ id: 
            doc.id, 
            data: doc.data() });
        });
        this.setState({ posteos: posts });
        console.log('Posteos:', this.state.posteos);
      },
      (error) => console.log(error)
    );
  }

  render() {
    return (
      <View style={styles.container}>

    <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>🎵 Bienvenido a Aurora 🎵</Text>
    </View>
 
    
        <Text style={styles.subTitle}>"Tu espacio para compartir la música que te mueve y descubrir nuevos sonidos"</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Post postData={item.data} postId={item.id} origen={"Home"} navigation={this.props.navigation}/>
          )}
        />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
   
  container: {
    paddingHorizontal: 10,
    marginTop: 10,
    flex: 1,
    backgroundImage: "url(https://i.pinimg.com/736x/6c/d9/3b/6cd93b821fcc13847d63d97184870c19.jpg)"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 10,
   },

  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 40, 
  },
  subTitle: {
    fontSize: 16,
    color: '#555',            
    textAlign: 'center',      
    marginBottom: 25,         
    fontStyle: 'italic',      
    paddingHorizontal: 20,    
},
    
});

export default Home;