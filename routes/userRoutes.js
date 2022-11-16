var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const classController = require('../controllers/classController.js');
const lessonController = require('../controllers/lessonController.js');
const commentController = require('../controllers/commentController.js');
const languageController = require('../controllers/languageController.js');
const { ensureAuthenticated } = require('../config/auth');

const path = require('path');
router.get('public', express.static(path.join(__dirname, 'public')));

/******userController******/

//Ir al la pantalla de inicio de la aplicación
router.get('/', userController.home);
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
//Ver el perfil de un usuario
router.get('/users/view_user_profile', ensureAuthenticated, userController.userProfileView);


/******classController******/

//Ir al la pantalla de crear clase
router.get('/users/create_class', ensureAuthenticated, classController.createClassView);
//Crear clase
router.post('/create_class', ensureAuthenticated, classController.createClass);
//Ir a la pantalla de clases en borrador creadas por el usuario
router.get('/users/drafts', ensureAuthenticated, classController.draftsView);
//Ir a la pantalla de clases publicadas por el usuario
router.get('/users/published', ensureAuthenticated, classController.publishedView);
//Ir a la pantalla de editar clase
router.get('/users/edit_class', ensureAuthenticated, classController.editClassView);
//Editar una clase
router.post('/edit_class/:id', ensureAuthenticated, classController.editClass);
//Eliminar una clase
router.get('/users/delete_class/:id', ensureAuthenticated, classController.deleteClass);
//Ver contenido de una clase creada por el usuario
router.get('/users/my_class', ensureAuthenticated, classController.myClassView);
//Ver contenido de una clase disponible 
router.get('/users/class', ensureAuthenticated, classController.classView);


/******lessonController******/

//Ir al la pantalla de crear lección
router.get('/users/create_lesson', ensureAuthenticated, lessonController.createLessonView);
//Crear lección
router.post('/create_lesson', ensureAuthenticated, lessonController.createLesson);
//Ir a la pantalla de editar lección
router.get('/users/edit_lesson', ensureAuthenticated, lessonController.editLessonView);
//Editar una lección
router.post('/edit_lesson/:id', ensureAuthenticated, lessonController.editLesson);
//Eliminar una lección
router.get('/users/delete_lesson/:id', ensureAuthenticated, lessonController.deleteLesson);
//Ver contenido de una lección
router.get('/users/lesson', ensureAuthenticated, lessonController.lessonView);


/******commentController******/

//Crear comentario
router.post('/create_comment', ensureAuthenticated, commentController.createComment);


/******languageController******/

//Ver todas las clases de la categoría de un idioma
router.get('/users/category', ensureAuthenticated, languageController.categoryView);

module.exports = router;
