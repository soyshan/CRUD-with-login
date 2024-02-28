import express from "express"
import { createTodo, getTodos, updateTodo, getTodo, deleteTodo } from "../controllers/todo.controller.js";
const router = express.Router()

router.get("/",getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/update/:id", updateTodo);
router.delete("/:id",deleteTodo)


export default router;