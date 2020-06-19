const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (req, res) => {
  return res.json(repositories)
});

app.post("/repositories", (req, res) => {
  const {title, url, techs} = req.body

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(newRepository)
  return res.status(200).json(newRepository)
});

app.put("/repositories/:id", (req, res) => {
    const RepId = req.params.id
    const RepIndex = repositories.findIndex(repository =>( repository.id === RepId))
    const {title, url, techs} = req.body

    if (RepIndex === -1 ){
      res.status(400).json({err: "Repository not found"})
    }

    const updatedInfo = {
      title,
      url,
      techs,
      likes: repositories[RepIndex].likes,
      id: RepId
    }

    repositories[RepIndex] = updatedInfo
    return res.status(200).json(updatedInfo)

});

app.delete("/repositories/:id", (req, res) => {
  const RepId = req.params.id
  const RepIndex = repositories.findIndex(repository => (repository.id == RepId))

  if(RepIndex === -1){
    res.status(400).json({err: "Repository not found"})
  }
  repositories.splice(RepIndex, 1)

  return res.status(204).send()
});

app.post("/repositories/:id/like", (req, res) => {
  const RepId = req.params.id
  const RepIndex = repositories.findIndex(repository => (repository.id === RepId))
  
  if(RepIndex === -1){
    return res.status(400).json({err: "Repository not found"})
  }

  const updatedInfo = {
    ...repositories[RepIndex],
    likes: repositories[RepIndex].likes + 1
  }

  repositories[RepIndex] = updatedInfo

  return res.status(200).json({
    likes:repositories[RepIndex].likes,
    title:repositories[RepIndex].title
  })

});

module.exports = app;
