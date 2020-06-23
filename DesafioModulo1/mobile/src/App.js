import React, {useEffect, useState} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'

export default function App() {

  const [repositories, Setrepositories] = useState([])

  // Retrieve projects from API
  useEffect(()=> {
    api.get('/repositories').then(res => {
      console.log(res.data)
      Setrepositories(res.data)
    })


  }, [])

  async function handleLikeRepository(id) {
    api.post(`repositories/${id}/like`)
    const repoIndex = repositories.findIndex(repo => (repo.id == id))
    repositories[repoIndex] = {...repositories[repoIndex], likes: repositories[repoIndex].likes + 1}
    Setrepositories([...repositories])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <SafeAreaView style={styles.container}>
        <FlatList
        data ={repositories}
        keyExtractor={(repository)=>(repository.id)}
        renderItem={({item})=>(
      
            <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{item.title}</Text>

                <View style={styles.techsContainer}>
                  <FlatList
                  data={item.techs}
                  listKey={(item, index)=> `${item} + ${String(index)}`}
                  keyExtractor={(tech) => (tech)}
                  renderItem={({item})=> (
                    <Text style={styles.tech}>{item}</Text>)}>
                  </FlatList>
                </View>
                
                <View style={styles.likesContainer}>
                  <Text 
                  style={styles.likeText} 
                  testID={`repository-likes-${item.id}`}>{item.likes} curtidas</Text>
                </View>

                <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                testID={`like-button-${item.id}`}>
                  <Text style={styles.buttonText}>Upvote</Text>

                </TouchableOpacity>

            </View>

          )}>
        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#19181f",
    padding: 20,
    borderRadius: 8
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },
  techsContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#404040",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
    marginTop: 2,
    borderRadius: 4
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "white"
  },
  button: {
    marginTop: 10,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: 80,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    borderRadius: 4
  },
});
