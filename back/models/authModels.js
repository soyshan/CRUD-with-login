import mongoose from "mongoose"

const authSchema = mongoose.Schema({
    username:{type:String, require:true},//indicamos el tipo de datos que esperamos aquí
    email:{type:String,require:true},
    password:{type:String,require:true},
    role:{type:String, default:"user", enum:["user", "admin"],require:true}
})

export const User = mongoose.model(
    "users", authSchema
)
