const express =require("express");
const { CreateToDo, UpdateToDo } = require("./schema");
const { todo } = require("./database") ;
const cors= require("cors");  /* this is used for hitting tthe backend server with any front end  */
const app =express();

app.use(express.json());
app.use(cors());
app.post("/todo",async (req,res)=>{
   const input =req.body;
   const parsedinput =CreateToDo.safeParse(input);

        if(!parsedinput.success){
            res.status(411).json({msg:"wrong inputs"});
               return;
        }  
       todo.create({
             title:parsedinput.data.title,
             description:parsedinput.data.description,
             completed:false
      }) ;
      const respond =await todo.find({});
      res.json({respond});

})

app.get("/todos",async (req,res)=>{  /* when fetch reaches this url the elements of database are reesponded/returrned  */
    const respond =await todo.find({}); /* using the todo module and .find function the entrys of databse is returned respond is the array of objects */
    res.json({respond});    /* this res.json form returns the respond in object form {respond} , object of arrayof object*/
})

app.post("/updatetodo",async (req,res)=>{
    const updateinput =req.body;
    const parsedupdateinput =UpdateToDo.safeParse(updateinput);
    if(!parsedupdateinput.success){
        res.status(411).json({msg:"wrong id"});
    }  
    try {
        await todo.deleteOne({ _id:req.body.id });
        res.json({ msg: "todo completed" });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ msg: "internal server error" });
    }
 })
app.listen("5000");