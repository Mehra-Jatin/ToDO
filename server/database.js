const mongoose =require("mongoose");

mongoose.connect("mongodb+srv://f:f@cluster0.hejhfgs.mongodb.net/todoapp");

const todoschema = mongoose.Schema({
                          title: String,
                          description: String,
                          completed:Boolean })

 const todo = mongoose.model("todos",todoschema);
 
 module.exports= {todo};