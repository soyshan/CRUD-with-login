import { Todo } from "../models/todo.model.js                    "

export const getTodos = async(req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
        console.log(todos)

    } catch (error) {
        res.status(500).json({message: "no funciona el servidor", error})
    }
}

//get unico elemento
export const getTodo = async(req, res) => {
    const id = req.params.id
    try {
        const todos = await Todo.findById({id:id});
        res.status(200).json(todos);
        console.log(todos)

    } catch (error) {
        res.status(500).json({message: "no funciona el servidor", error})
    }
}

export const createTodo = async (req, res) =>{
    //lo que vamos a insertar dentro del body:title, task, type.
    const {title, task, type}= req.body;
    try {
    //las variables title, task y type deben ser iguales a las del modelo.
        const todo = new Todo ({
            title:title,
            task:task,
            type:type
        });
        await todo.save();
        res.status(200).json({message:"testeando await",todo})
    } catch (error) {
        res.status(500).json({message:"no funciona", error})
        
    }
}

export const updateTodo = async (req,res)=>{
    const id = req.params.id
    console.log(id);
    try {
        await Todo.updateOne({_id:id},req.body);
        res.status(200).json({message:"se ha actualizado",id});
    }  catch (error) {
        res.status(500).json({message:"no se actualizó correctamente", error})
        
    }
}

export const deleteTodo = async (req,res)=>{
    const id = req.params.id
    console.log(id);
    try {
        await Todo.deleteOne({_id:id},req.body);
        res.status(200).json({message:"se ha eliminado",id});
    }  catch (error) {
        res.status(500).json({message:"no se eliminó correctamente", error})
        
    }
}




//el id lo coge gracias al params
