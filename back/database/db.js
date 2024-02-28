import mongoose from "mongoose";

export const db = async() =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/todolist");
        console.log("Connected");
    } catch (error){
        console.log(error);
    }
}

