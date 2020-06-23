import {Request, Response} from 'express'
import createUser from './services/CreateUser'

export default function helloWorld(req: Request, res: Response){
    const user = createUser({
        name: "Lucao",
        password: "12345",
        techs: [
            {tech: "Javascript", skill: 100},
            {tech: "Node", skill: 100},
            "Deno",
            "React Native"
        ]
    })
    return res.json(user)
}