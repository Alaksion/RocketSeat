import React, {useState, useEffect} from 'react'
import Header from './components/Header/index.js'
import api from '../src/services/api'

export default function App(){
    const [projects, setProjects] = useState([])

    useEffect(  ()=>{
        api.get('/projects').then(response=> {
            setProjects(response.data)
            })
    }, [] )

    function handleAddProject(){
        const NewProject = {
            title: "Titulo 1",
            owner: "Owner 1",
            technologies: ["1","2"],
        }
        api.post('/projects', NewProject)
        setProjects([...projects, NewProject])
    }

    return (
        <>
            <Header title="Projects">
                <ul>
                    {projects.map(project => <li key={project.id}> {project.title} </li>)}
                </ul>
                <button 
                    type='button'
                    onClick={() => handleAddProject()}> adicionar projeto
                </button>
            </Header>
        </>
    )
        
}