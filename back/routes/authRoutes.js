import express from "express"
import { Register } from "../controllers/authControllers.js"
import { Login } from "../controllers/authControllers.js"

const router = express.Router()
router.post("/register", Register)
router.post("/login",Login)
export default router;