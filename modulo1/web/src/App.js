import React, {useState} from 'react'
import Header from './components/Header/index.js'
import catImage from '../src/assets/gato.webp'

export default function App(){
    const [projects, setProjects] = useState(['Front-end', 'Backend'])

    function handleAddProject(){
        setProjects([...projects, `Novo projeto + ${Date.now()}`])
        console.log(projects)
    }

    return (
        <>
            <Header title="Projects">
                <ul>
                    {projects.map(project=> <li key={project}> {project} </li>)}
                </ul>
                <button 
                    type='button'
                    onClick={() => handleAddProject()}> adicionar projeto
                </button>
                <img src={catImage} alt="gato" height={400} width={200}></img>

            </Header>
        </>
    )
        
}