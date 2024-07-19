const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/authController");

// Define la ruta para la página de inicio de sesión (GET)
// Llama al método `login` del controlador para renderizar la vista de login
router.get("/login", authControllers.login);

// Define la ruta para manejar el formulario de inicio de sesión (POST)
// Llama al método `authLogin` del controlador para autenticar al usuario
router.post("/login", authControllers.authLogin);

// Define la ruta para la página de registro (GET)
// Llama al método `register` del controlador para renderizar la vista de registro
router.get("/register", authControllers.register);

// Define la ruta para manejar el formulario de registro (POST)
// Llama al método `authRegister` del controlador para registrar un nuevo usuario
router.post("/register", authControllers.authRegister);

// Define la ruta para la página de recuperación de contraseña (GET)
// Llama al método `recPass` del controlador para renderizar la vista de recuperación de contraseña
router.get('/recPass', authControllers.recPass);

// Define la ruta para manejar el formulario de recuperación de contraseña (POST)
// Llama al método `handleRecPass` del controlador para procesar la solicitud de recuperación de contraseña
router.post('/recPass', authControllers.handleRecPass);

// Define la ruta para la página de actualización de contraseña (GET)
// Llama al método `updatePass` del controlador para renderizar la vista de actualización de contraseña
router.get('/updatePass', authControllers.updatePass);

// Define la ruta para manejar el formulario de actualización de contraseña (POST)
// Llama al método `handleUpdatePass` del controlador para actualizar la contraseña del usuario
router.post('/updatePass', authControllers.handleUpdatePass);

module.exports = router;

