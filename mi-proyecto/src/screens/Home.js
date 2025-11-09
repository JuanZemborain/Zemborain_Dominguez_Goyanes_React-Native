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
    db.collection('posts').onSnapshot(
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
        <Text style={styles.title}>Home</Text>

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
    marginBottom: 20,
    textAlign: 'center',
  },
    button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745'
  },
  buttonText: {
    color:'#fff',
    fontWeight:'bold',
    textAlign:'center'
  }
});

export default Home;