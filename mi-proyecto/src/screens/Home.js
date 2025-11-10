import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: []
    };
  }

  componentDidMount() {
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
        <Text style={styles.title}>Bienvenido a Aurora</Text>
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
    marginTop: 20,
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: 'center',
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