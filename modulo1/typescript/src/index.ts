import express from 'express'
import helloWorld from './routes'

const app = express();

app.get("/", helloWorld)

app.listen(3030, ()=>{console.log("Servidor rodando na porta 3030")})
