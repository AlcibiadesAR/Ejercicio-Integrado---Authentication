var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// Importa el módulo express-session para manejar sesiones de usuario
let session = require("express-session");

var indexRouter = require("./routes/index");
// Importa el enrutador para las rutas de autenticación
let authRouter = require("./routes/auth");

// Crea una nueva aplicación Express
var app = express();

app.set("views", path.join(__dirname, "views")); 
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configura el middleware para manejar sesiones de usuario
app.use(
  session({
    secret: 'dhmovies', // Clave secreta para firmar la cookie de sesión
    resave: false, // No guarda la sesión en cada solicitud si no ha sido modificada
    saveUninitialized: true, // Guarda una nueva sesión sin modificar en la tienda de sesiones
  })
);

// Middleware para añadir el email del usuario a las variables locales si está en la sesión
app.use(function (req, res, next) {
  if (req.session.email !== undefined) { // Si el email está definido en la sesión
    res.locals.userEmail = req.session.email; // Añade el email a las variables locales
  } 
  return next(); // Llama al siguiente middleware
});

// Configura las rutas de la aplicación
app.use("/", indexRouter); // Usa el enrutador de las rutas principales
app.use("/", authRouter); // Usa el enrutador de las rutas de autenticación

// Middleware para manejar errores 404
app.use(function (req, res, next) {
  next(createError(404)); // Crea un error 404 y lo pasa al manejador de errores
});

// Middleware para manejar errores
app.use(function (err, req, res, next) {
  // Configura las variables locales con el mensaje de error y el error en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Renderiza la página de error con el estado del error
  res.status(err.status || 500);
  res.render("error"); // Renderiza la vista de error
});

// Exporta la aplicación para que pueda ser utilizada en otros archivos
module.exports = app;
