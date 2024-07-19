// Array para almacenar los usuarios registrados
const users = [];

let authControllers = {
  // Renderiza la vista de login
  login: function (req, res) {
    return res.render("login", {
      title: "Página de login", // Título de la página
    });
  },

  // Maneja la autenticación de usuarios durante el login
  authLogin: function (req, res) {
    const { email, password } = req.body; // Extrae email y password del cuerpo de la solicitud
    const user = users.find(u => u.email === email && u.password === password); // Busca el usuario que coincide con el email y la contraseña

    if (user) { // Si el usuario existe
      req.session.email = email; // Guarda el email en la sesión
      res.cookie('userEmail', email, { maxAge: 900000, httpOnly: true }); // Establece una cookie con el email del usuario
      res.redirect("/"); // Redirige a la página principal
    } else { // Si el usuario no existe
      res.redirect('/login'); // Redirige de nuevo a la página de login
    }
  },

  // Renderiza la vista de registro
  register: function (req, res) {
    return res.render("register", {
      title: "Página de registro" // Título de la página
    });
  },

  // Maneja el registro de nuevos usuarios
  authRegister: function (req, res) {
    const { firstName, lastName, email, edad, password } = req.body; // Extrae los datos del cuerpo de la solicitud
    const userExists = users.find(u => u.email === email); // Verifica si ya existe un usuario con el mismo email

    if (userExists) { // Si el usuario ya existe
      res.redirect('/login'); // Redirige a la página de login
    } else { // Si el usuario no existe
      users.push({ firstName, lastName, email, edad, password }); // Agrega el nuevo usuario al array
      res.redirect('/login'); // Redirige a la página de login
    }
  },

  // Renderiza la vista de recuperación de contraseña
  recPass: function (req, res) {
    return res.render("recPass", {
      title: "Recuperación de contraseña", // Título de la página
    });
  },

  // Maneja la solicitud de recuperación de contraseña
  handleRecPass: function (req, res) {
    const { email } = req.body; // Extrae el email del cuerpo de la solicitud
    const user = users.find(u => u.email === email); // Busca el usuario que coincide con el email

    if (user) { // Si el usuario existe
      res.redirect(`/updatePass?email=${encodeURIComponent(email)}`); // Redirige a la página de actualización de contraseña con el email en la URL
    } else { // Si el usuario no existe
      res.redirect('/recPass'); // Redirige de nuevo a la página de recuperación de contraseña
    }
  },

  // Renderiza la vista para actualizar la contraseña
  updatePass: function (req, res) {
    const { email } = req.query; // Extrae el email de los parámetros de consulta
    return res.render("updatePass", {
      title: "Actualizar contraseña", // Título de la página
      email // Pasa el email a la vista para que se pueda usar en el formulario
    });
  },

  // Maneja la actualización de la contraseña
  handleUpdatePass: function (req, res) {
    const { email, newPassword } = req.body; // Extrae el email y la nueva contraseña del cuerpo de la solicitud
    const user = users.find(u => u.email === email); // Busca el usuario que coincide con el email
  
    if (user) { // Si el usuario existe
      user.password = newPassword; // Actualiza la contraseña del usuario
      res.redirect('/login'); // Redirige a la página de login
    } else { // Si el usuario no existe
      res.redirect(`/updatePass?email=${encodeURIComponent(email)}`); // Redirige a la página de actualización de contraseña con el email en la URL
    }
  }
};

// Exporta el objeto authControllers para que pueda ser utilizado en otras partes de la aplicación
module.exports = authControllers;
