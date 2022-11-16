const express = require('express');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Usuario = require("../models/userModel.js");
const Idioma = require("../models/languageModel.js");
const Clase = require("../models/classModel.js");
const Leccion = require("../models/lessonModel.js");
const titles = require('../config/titles');

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const lessonController = require('./lessonController.js');


module.exports = {

    //Ir al la pantalla de crear clase
    createClassView: async (req, res) => {
        const user = req.user;
        const languages = await Idioma.find({}).lean();
        res.render('users/create_class', { title: titles.view.createClassView, usuario: user, idiomas: languages });
    },

    //Crear clase
    createClass: async (req, res) => {
        console.log(req.body);
        const clase = new Clase(req.body);
        await clase.save();
        req.flash('success_msg', 'Clase creada');
        res.redirect('/users/home');
    },

    //Ir a la pantalla de clases en borrador creadas por el usuario
    draftsView: async (req, res) => {
        const user = req.user;
        const classes = await Clase.find({ user: user.email, published: "false" }).lean();
        res.render('users/drafts', { title: titles.view.draftsView, usuario: user, clases: classes });


    },

    //Ir a la pantalla de clases publicadas por el usuario
    publishedView: async (req, res) => {
        const user = req.user;
        const classes = await Clase.find({ user: user.email, published: "true" }).lean();
        res.render('users/published', { title: titles.view.publishedView, usuario: user, clases: classes });

    },

    //Ir a la pantalla de editar clase
    editClassView: async (req, res) => {
        const user = req.user;
        const classe = await Clase.findById(req.query.id).lean();
        const languages = await Idioma.find().lean();
        console.log(classe);
        res.render('users/edit_class', { title: titles.view.editClassView, usuario: user, idiomas: languages, clase: classe });
    },

    //Editar una clase
    editClass: async (req, res) => {
        const { id } = req.params;
        await Clase.updateOne({ _id: id }, req.body);
        req.flash('success_msg', 'Clase actualizada');
        res.redirect('/users/home');
    },


    //Eliminar una clase
    deleteClass: async (req, res) => {
        var { id } = req.params;
        await Clase.remove({ _id: id });
        await Leccion.remove({ class_id: id });
        req.flash('success_msg', 'Clase eliminada');
        res.redirect('/users/home');
    },

    //Ver contenido de una clase creada por el usuario
    myClassView: async (req, res) => {
        const user = req.user;
        const classe = await Clase.findById(req.query.id).lean();
        const drafts = await Leccion.find({ class_id: classe._id, published: "false" });
        const published = await Leccion.find({ class_id: classe._id, published: "true" });
        console.log(classe);
        res.render('users/my_class', { title: titles.view.classView, usuario: user, clase: classe, borradores: drafts, publicadas: published });
    },


    //Ver contenido de una clase disponible 
    classView: async (req, res) => {
        const user = req.user;
        const classe = await Clase.findById(req.query.id).lean();
        const lessons = await Leccion.find({ class_id: classe._id, published: "true" });
        console.log(classe);
        res.render('users/class', { title: titles.view.classView, usuario: user, clase: classe, lecciones: lessons });
    },

};