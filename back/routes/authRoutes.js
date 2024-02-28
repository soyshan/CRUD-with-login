import express from "express"
import { Register, Login } from "../controllers/authControllers.js"
import { isAuthenticated, isAdmin } from '../middleware/middleware.js';


const router = express.Router()

router.post("/register", Register)
router.post("/login",Login)



// Ejemplo de una ruta protegida que requiere autenticación
router.get('/profile', isAuthenticated, (req, res) => {
    res.json({ message: 'Bienvenido a tu perfil', user: req.user });
});

// Ejemplo de una ruta protegida que requiere privilegios de administrador
router.post('/admin/addUser', isAuthenticated, isAdmin, (req, res) => {
    // Agregar lógica para agregar un nuevo usuario (solo accesible para administradores)
});


export default router;