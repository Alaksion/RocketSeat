const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030

const projects = []
let counter = 0

function logRequest(req, res, next){
    const { method, url} = req
    const logLabel = `${method} - ${url}`
    console.time(logLabel) // passo 1 
    next() 
    console.timeEnd(logLabel) 
}

app.use(cors())
app.use(express.json())
app.use(logRequest)

app.get('/projects', logRequest,  (req, res)=>{
    const owner = req.query.owner

    const FilteredProjects = owner ? projects.filter(project => project.owner.includes(owner)) : projects
    return res.json(FilteredProjects)
})

app.post('/projects', (req, res)=>{
    const data = req.body
    const newproject = {
        title: data.title,
        owner: data.owner,
        technologies: data.technologies,
        id: counter
    }
    projects.push(newproject)
    counter++
    return res.json(newproject)

})

app.put('/projects/:id', (req, res)=>{
    const ProjectIndex = projects.findIndex(project => project.id == req.params.id)
    const data = req.body
  
    if(ProjectIndex == -1){
        return res.status(400).json({msg:"Register not found"})
    }

    const UpdatedProject = {
        title: data.title,
        owner: data.owner,
        technologies: data.technologies,
        id: Number(req.params.id)
    }

    projects[ProjectIndex] = UpdatedProject

    return res.json({data: projects[ProjectIndex] , msg: "Project updated successfuly"})

})
app.delete('/projects/:id', (req, res)=>{
    const ProjectIndex = projects.findIndex(project => project.id == req.params.id)
    
    if(ProjectIndex === -1){
        return res.status(401).json({msg:"Register not found"})
    }
    
    projects.splice(ProjectIndex, 1)
    return res.json({msg: "Register deleted successfuly"}).status(204)

})



// app.liste recebe dois parâmetros: a porta e a função callback que irá rodar quando o servidor ir para o ar
app.listen(port, ()=>(console.log("✌ Servidor rodando na porta 3030")))