const express = require("express")
const Route = express.Router()
const TodoController = require("../controller/todoController")
const AuthController = require("../controller/authController")


Route.get("/",  TodoController.get)

Route.get("/:id",  TodoController.getById)

Route.post("/",  TodoController.post);
  
Route.put("/:id",  TodoController.put)

Route.delete("/:id",  TodoController.delete)


module.exports = Route;