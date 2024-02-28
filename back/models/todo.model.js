import mongoose from "mongoose";
const todoSchema = mongoose.Schema({
    //el require es para hacerlo obligatorio

    title:{type:String, require:true},
    tasks:{type:String, require:true},
    type:{type:String, enum:["work","school","cook"]},
    // createdAt:{type:Date.now()},
    // updatedAt:{type:Date.now()},
    
// timestamp: para no poner create update, te lo crea solo
},{timestamp:true});
export const Todo = mongoose.model("tasks", todoSchema)
//le pasamos el nombre de la tabla"tasks" y busque información de alli

//createdAt y updatedAt normalmente te lo crea solo mongo

