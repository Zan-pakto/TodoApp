const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://arvind:Shahi1234@cluster0.9xbts.mongodb.net/todoapp"
);
const todoschema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});
const todo = mongoose.model("todos", todoschema);
module.exports = {
  todo: todo,
};
