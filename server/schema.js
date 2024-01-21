const zod = require("zod");


         const CreateToDo= zod.object({
            title :zod.string() ,
            description : zod.string()});


     
            const UpdateToDo= zod.object({
                id:zod.string() });       

    module.exports= {CreateToDo:CreateToDo ,UpdateToDo:UpdateToDo}            