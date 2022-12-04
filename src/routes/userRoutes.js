var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const publicationController = require('../controllers/publicationController.js');
const commentController = require('../controllers/commentController.js');
const { ensureAuthenticated } = require('../config/auth');

const path = require('path');
router.get('public', express.static(path.join(__dirname, 'public')));

/******userController******/

//Ir al la pantalla de inicio de la aplicación
/*router.get('/', userController.home);*/

//Ir al la pantalla acerca de
router.get('/about', userController.about);
//Ir a la vista del inicio de sesión
router.get('/login', userController.loginView);
//Autenticación del usuario con el inicio de sesión
router.post('/login', userController.login);
//Ir a la vista de registro de usuario
router.get('/signup', userController.signupView);
//Registrar los datos del usuario
router.post('/signup', userController.signup);
//Cerrar la sesión
router.get('/logout', userController.logout);
//Ir a la pantalla principal del usuario
router.get('/users/home', ensureAuthenticated, userController.homeUserView);
// Perfil de usuario
router.get('/users/profile', ensureAuthenticated, userController.profile);
// Ir a vista para editar perfil de usuario
router.get('/users/edit_profile', ensureAuthenticated, userController.editProfileView);
// Editar perfil de usuario
router.post('/users/edit_profile/:id', ensureAuthenticated, userController.editProfile);
// Editar foto de perfil de usuario
router.post('/users/edit_photo_profile/:id', ensureAuthenticated, userController.editPhotoProfile);
//Ver el perfil de un usuario
router.get('/users/view_user_profile', ensureAuthenticated, userController.userProfileView);


/******publicationController******/

//Ir al la pantalla de crear publicacion
router.get('/users/create_publication', ensureAuthenticated, publicationController.createPublicationView);
//Crear publicacion
router.post('/create_publication', ensureAuthenticated, publicationController.createPublication);
//Ir a la pantalla de editar publicacion
router.get('/users/edit_publication', ensureAuthenticated, publicationController.editPublicationView);
//Editar una publicacion
router.post('/edit_publication/:id', ensureAuthenticated, publicationController.editPublication);
//Eliminar una publicacion
router.get('/users/delete_publication/:id', ensureAuthenticated, publicationController.deletePublication);
//Ver contenido de una publicacion creada por el usuario
router.get('/users/my_publications', ensureAuthenticated, publicationController.myPublicationsView);
//Ver contenido de una publicacion disponible 
router.get('/users/publication', ensureAuthenticated, publicationController.publicationView);

/******commentController******/

//Crear comentario
router.post('/create_comment', ensureAuthenticated, commentController.createComment);



module.exports = router;
