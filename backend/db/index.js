const mongoose=require("mongoose"); 
// const { boolean } = require("zod");

mongoose.connect("mongodb+srv://msanthoshhh:Rockmadhav123@cluster0.z7pts0d.mongodb.net/todo");  

const todoSchema=mongoose.Schema({
  title:String,
  description:String,
  completed:Boolean
})

const signupSchema=mongoose.Schema({
  username:String,
  password:String
})

const todo=mongoose.model('todo',todoSchema);

const signup=mongoose.model('signup',signupSchema);

module.exports={todo,signup};