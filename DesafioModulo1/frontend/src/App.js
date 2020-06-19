import React, {useEffect, useState} from "react";
import api from './services/api.js'
import "./styles.css";

function App() {
  const [Repositories, setRepositories] = useState([])

  useEffect( ()=> {
    api.get('/repositories').then(res => (
      setRepositories(res.data)
    ))
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      title: "Desafio ReactJS",
      owner: "Lukao",
      techs: ["JavaScript", "Deno", "Node"]
    }
    
    await api.post('/repositories', newRepository)
    setRepositories([...Repositories, newRepository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const updateRepositories = Repositories.filter(repository => repository.id !== id)
    setRepositories(updateRepositories)
  }

  return (
    <div className='container'>
      <ul data-testid="repository-list">
       {Repositories.map(repository => { 
          return (
            <li key={repository.id}>{repository.title} 
              <button onClick={()=> handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          )
        })}
      </ul>

      <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}

export default App;
