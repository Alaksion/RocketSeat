// Para criar um usuário usaremos um nome, email, senha.

interface TechsData {
    tech: string,
    skill : number
}

interface CreateUserData {
    name: string,
    email ?: string, // definindo que o campo é opcional
    password : string,
    techs: Array<string | TechsData>
}

export default function CreateUser({name, email = "", password, techs} : CreateUserData ){
    const user = {
        name, 
        email,
        password,
        techs,
    }
    return user

}