// middlewares.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno desde el archivo .env

export const verifySecretKey = (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const { secret } = req.body; // Suponiendo que el secret key se envía en el cuerpo de la solicitud

    if (!secret || secret !== secretKey) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};

export const isAuthenticated = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        // Verificar el token JWT y decodificarlo para obtener información del usuario
        jwt.verify(token, 'codesecret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Token inválido' });
            } else {
                req.user = decoded; // Almacenar la información del usuario decodificada en el objeto de solicitud para su uso posterior
                next(); // Permitir que la solicitud continúe
            }
        });
    } else {
        return res.status(401).json({ message: 'No estás autenticado' });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // Si el usuario es un administrador, permite que la solicitud continúe
    } else {
        return res.status(403).json({ message: 'No tienes permiso para acceder a esta ruta' });
    }
};
