const z=require("zod"); 

const createTodo=z.object({
  title:z.string().min(3,{message: "Title must be at least 3 characters long"}),
  description:z.string().min(8,{ message: "Description must be at least 10 characters long"})
});
const updateTodo=z.object({
  id:z.string(),
  title: z.string().min(3).optional(),
  description: z.string().min(8).optional(),
  completed: z.boolean().optional()
});

const checkFormatSignup=z.object({
  username:z.string().min(3),
  password:z.string().min(4)
})

module.exports={
  createTodo:createTodo,
  updateTodo:updateTodo,
  checkFormatSignup:checkFormatSignup

}