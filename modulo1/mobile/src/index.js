import React, {useState, useEffect} from 'react'
import {View, Text, StatusBar, FlatList, SafeAreaView, TouchableOpacity} from 'react-native'
import styles from './styles.js'
import api from './services/api.js'


export default function App(){

    const [projects, Setprojects] = useState([])

    useEffect(()=> {
        api.get('/projects').then((res)=>{
            console.log(res.data)
            Setprojects(res.data)
        })

    }, [])

    async function HandleNewProject(){
        const newProject = {
            title: "Teste",
            owner: "Teste",
            technologies: ["Teste1", "Teste2"]
        }
        await api.post('/projects', newProject)
        Setprojects([...projects, newProject])

    }

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar translucent={true} backgroundColor="#212121"></StatusBar>

            <TouchableOpacity 
                style={styles.NewProjectButton}
                onPress={() => HandleNewProject()}
                activeOpacity={0.7}>
                    <Text style={styles.texto}>New Project</Text>
            </TouchableOpacity>

            <View style={styles.listContainer}>
                <FlatList
                data={projects} 
                showsVerticalScrollIndicator={false}
                keyExtractor={project=> project.id}
                renderItem={({item}) => (
                    <View>
                        <Text style={styles.texto}>Title: {item.title}</Text>
                        <Text style={styles.texto}>Owner: {item.owner}</Text>
                    </View>
                )}>
                </FlatList>

            </View>
            
        </SafeAreaView>
    )
}