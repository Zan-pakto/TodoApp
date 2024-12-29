const express = require("express");
const cors = require("cors");
const app = express();
const { createTodo } = require("./types");
const { updateTodo } = require("./types");
app.use(express.json());

const { todo } = require("./db");
app.use(cors());
app.post("/addtodo", async function (req, res) {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    return res.status(411).json({
      msg: "You provided the wrong inputs",
    });
  }

  try {
    await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });
    res.json({
      msg: "created",
    });
  } catch (error) {
    res.status(411).json({
      msg: "you put the wrong inputs",
    });
  }
});
app.get("/todos", async function (req, res) {
  const todos = await todo.find();
  console.log(todos);
  res.json({
    todos,
  });
});
app.put("/completed", async function (req, res) {
  const identity = req.body;
  const parseIdentity = updateTodo.safeParse(identity);
  if (!parseIdentity.success) {
    res.json({
      msg: "error",
    });
  }
  try {
    await todo.updateOne(
      {
        _id: req.body.id,
      },
      {
        completed: true,
      }
    );
    res.json({
      msg: "mark as completed",
    });
  } catch (e) {
    res.status(400).json({
      msg: "wrong identity",
    });
  }
});
app.listen(3000);
