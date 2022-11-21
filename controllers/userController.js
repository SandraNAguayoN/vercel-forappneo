const express = require('express');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Usuario = require("../models/userModel.js");
const Publicacion = require("../models/publicationModel.js");
const titles = require('../config/titles');

const multer = require('multer');
const fs = require('fs');
const path = require('path');


module.exports = {

    //Ir al la pantalla de inicio de la aplicación
    home(req, res) {
        res.render('index', { title: titles.view.home });
    },

    //Ir al la pantalla acerca de
    about(req, res) {
        res.render('about', { title: titles.view.about });
    },


    //Ir a la vista del inicio de sesión
    loginView(req, res) {
        res.render('../views/login', { title: titles.view.login });
    },

    //Autenticación del usuario con el inicio de sesión
    login(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/users/home',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res, next);
    },

    //Ir a la vista de registro de usuario
    signupView(req, res) {
        res.render('../views/signup', { title: titles.view.signup });
    },


    //Registrar los datos del usuario
    signup(req, res, next) {
        // Constantes con multer para subir imagen
        const storage = multer.diskStorage({
            destination: path.join(__dirname, '../public/profiles'),
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });
        const uploadImage = multer({
            storage,
            limits: { fileSize: 1000000000 }
        }).single('image');

        uploadImage(req, res, async (err) => {
            const username = req.body.username;
            const lastname = req.body.lastname;
            const birthdate = req.body.birthdate;
            const email = req.body.email;
            const password = req.body.password;
            const password2 = req.body.password2;
            const image = '../profiles/' + req.file.originalname;

            //Verifica que la imagen no sea muy grande
            if (err) {
                errors.push({ msg: "La imagen es muy grande." });
                return res.send(err);
            }

            let errors = [];
            console.log(' Email :' + email + ' Contraseña:' + password);

            //Verifica que se hayan llenado los campos correspondientes
            if (!email || !password || !password2) {
                errors.push({ msg: "Por favor llena todos los campos." })
            }
            //Verifica que las dos contraseñas coinicidan.
            if (password !== password2) {
                errors.push({ msg: "Las contraseñas no coinciden." });
            }

            //Verifica que la contraseña tenga 6 o más caracteres.
            if (password.length < 6) {
                errors.push({ msg: 'La contraseña debe tener al menos 6 caracteres.' })
            }
            if (errors.length > 0) {
                res.render('signup', {
                    title: titles.view.signup,
                    errors: errors,
                    email: email,
                    password: password,
                    password2: password2
                })
            } else {
                //Si la validación ha sido correcta
                Usuario.findOne({ email: email }).exec((err, user) => {
                    console.log(user);
                    if (user) {
                        errors.push({ msg: 'Este correo ya se encuentra registrado.' });
                        res.render('signup', { title: titles.view.signup, errors, username, lastname, birthdate, email, password, password2, image })
                    } else {
                        const newUser = new Usuario({
                            username: username,
                            lastname: lastname,
                            birthdate: birthdate,
                            email: email,
                            password: password,
                            image: image
                        });

                        //hash password
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(newUser.password, salt,
                                (err, hash) => {
                                    if (err) throw err;
                                    //Guarda el HASH
                                    newUser.password = hash;
                                    //Guarda el usuario
                                    newUser.save()
                                        .then((value) => {
                                            console.log(value)
                                            req.flash('success_msg', 'Te has registrado correctamente.');
                                            res.redirect('/login');
                                        })
                                        .catch(value => console.log(value));

                                }));
                    }
                });
            }

        });
    },

    //Cerrar la sesión
    logout(req, res) {
        req.logout();
        req.flash('success_msg', 'Cerraste la sesión');
        res.redirect('/login');
    },

    //Ir a la pantalla principal del usuario
    homeUserView: async (req, res) => {
        const user = req.user;
        const publications = await Publicacion.find({}).lean();
        res.render('../views/users/home', { title: titles.view.homeUser, usuario: user, publicaciones: publications });
    },

    // Perfil de usuario
    profile: async (req, res) => {
        const user = req.user;
        res.render('users/profile', {
            title: titles.view.profile, usuario: user
        });
    },

    // Ir a vista para editar perfil de usuario
    editProfileView(req, res) {
        const user = req.user;
        res.render('users/edit_profile', { title: titles.view.editProfileView, usuario: user });
    },

    // Editar perfil de usuario
    editProfile: async (req, res, next) => {
        const { id } = req.params;

        // Constantes con multer para subir imagen
        const storage = multer.diskStorage({
            destination: path.join(__dirname, '../public/profiles'),
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });

        const uploadImage = multer({
            storage,
            limits: { fileSize: 1000000000 }
        }).single('image');


        uploadImage(req, res, async (err) => {

            const username = req.body.username;
            const lastname = req.body.lastname;
            const birthdate = req.body.birthdate;
            const image = '../profiles/' + req.file.originalname;

            //Verifica que la imagen no sea muy grande
            if (err) {
                errors.push({ msg: "La imagen es muy grande." });
                return res.send(err);
            }
            await Usuario.updateOne({ _id: id }, { username, lastname, birthdate, image });
            req.flash('success_msg', 'Perfil actualizado');
            res.redirect('/users/profile');
        });

    },


    //Ver el perfil de un usuario
    userProfileView: async (req, res) => {
        const user = req.user;
        var profile = req.query.id;
        const profile_user = await Usuario.findOne({ _id: profile }).lean();
        res.render('users/view_user_profile', { title: titles.view.viewUserProfileView, usuario: user, perfil: profile_user });
    },

};