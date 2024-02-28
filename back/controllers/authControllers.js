import { User } from "../models/authModels.js";
import  bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async (req, res) =>{
    const {username, password, email } = req.body; //para indicar que esa es la informacion que queremos que capte
    try {
        const existingEmail = await User.findOne({email:email}) //findOne es un metodo de moogose, con sequelize seria distinto.
        if(existingEmail){
            return res.status(400).json({message:"Este email ya existe"})//si el email existe en la base de datos vamos a darle una respuesta de... Este email ya existe.
            }
            const salt = await bcrypt.genSalt(10) //para encriptar la contraseña, salt es solo un nombre que se suele utilizar. Pero genSalt debe ser asi.
                                                // ponerlo despues de declarar la contraseña
            const hashPassword = await bcrypt.hash(password,salt)

       //si no existe, creamos uno nuevo
        const credentials = new User ({
            username: username,
            password:hashPassword,
            email:email
        })
        await credentials.save() //para guardar datos.
        res.status(200).json({message:"Nuevo usuario creado correctamente", credentials})

    } catch (error) {
        res.status(500).json({message:"Ha habido algun error en el registro"})
    } 
}

export const Login = async (req,res) =>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email:email})//Buscamos si el email existe
        if(!user){
            return res.status(400).json({message:"Invalidad email"})
        }else{
            const validPassword = await bcrypt.compare(password, user.password) //encuentra el usuario que contiene ese email
            if (!validPassword){
                return res.status(400).json({message: "Invalid password"})
            }
        }
        //Generamos un token tras el login
        const token = jwt.sign({
            email:email,
            role:user.role
            
        },"codesecret")
        
        await res.header({
            //le damos un nombre a ese header
            "auth":token
        })
        res.status(200).json({message:"Login successfull",token})
    } catch (error) {
        res.status(500).json({message:"El login ha ido mal",error})
    }
}