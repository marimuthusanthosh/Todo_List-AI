const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const { createTodo, updateTodo, checkFormatSignup } = require("./types");
const { todo, signup } = require("./db/index");
const { todoMiddleware } = require("./middleware/todoMiddleware");
const { JWT_SECRET } = require("./config");
const cors=require("cors")
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/signup", async (req, res) => {
  const signupPayload = req.body;
  const parsedPayload = checkFormatSignup.safeParse(signupPayload);

  if (!parsedPayload.success) {
    return res.status(411).json({ message: "Wrong input format" });
  }

  const { username, password } = signupPayload;

  await signup.create({ username, password });

  const token = jwt.sign({ username }, JWT_SECRET);
  res.json({
    message: "Your account was created successfully",
    token: token,
  });
});

app.post("/todo", todoMiddleware, async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    return res.status(411).json({
      message: "You sent the wrong inputs",
    });
  }

  const { title, description, completed } = createPayload;

  await todo.create({
    title,
    description,
    completed
  });

  res.json({ message: "Todo Created" });
});

app.get("/todos", async (req, res) => {
  const response = await todo.find({});
  res.json({
    your_todos: response,
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);

  if (!parsedPayload.success) {
    return res.status(411).json({
      message: "You sent the wrong inputs",
    });
  }
   
  const todoId=req.body.id;
  await todo.findByIdAndUpdate(
    { _id: req.body.id },
    { completed: true }
  ); 
  await todo.findByIdAndDelete(todoId);

  res.json({
    message: "Todo marked as completed and deleted",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
