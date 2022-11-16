const express = require('express');
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const Usuario = require("../models/userModel.js");
const Idioma = require("../models/languageModel.js");
const Clase = require("../models/classModel.js");
const Leccion = require("../models/lessonModel.js");
const Comentario = require("../models/commentModel.js");
const titles = require('../config/titles');

const multer = require('multer');
const fs = require('fs');
const path = require('path');


module.exports = {

    //Ir al la pantalla de crear lección
    createLessonView: async (req, res) => {
        const user = req.user;
        var id = req.query.id; //id de clase
        const classe = await Clase.findOne({ _id: id }).lean();
        console.log(classe);
        res.render('users/create_lesson', { title: titles.view.createLessonView, usuario: user, clase: classe });
    },

    //Crear lección
    createLesson: async (req, res) => {
        console.log(req.body);
        const leccion = new Leccion(req.body);
        await leccion.save();
        req.flash('success_msg', 'Lección creada');
        res.redirect('/users/home');
    },

    //Ir a la pantalla de editar lección
    editLessonView: async (req, res) => {
        const user = req.user;
        const lesson = await Leccion.findById(req.query.id).lean();
        console.log(lesson);
        res.render('users/edit_lesson', { title: titles.view.editLessonView, usuario: user, leccion: lesson });
    },


    //Editar una lección
    editLesson: async (req, res) => {
        const { id } = req.params;
        await Leccion.updateOne({ _id: id }, req.body);
        req.flash('success_msg', 'Lección editada');
        res.redirect('/users/home');
    },



    //Eliminar una lección
    deleteLesson: async (req, res) => {
        var { id } = req.params;
        await Leccion.remove({ _id: id });
        await Comentario.remove({ lesson_id: id });
        req.flash('success_msg', 'Lección eliminada');
        res.redirect('/users/home');
    },

    //Ver contenido de una lección
    lessonView: async (req, res) => {
        const user = req.user;
        const lesson = await Leccion.findById(req.query.id).lean();
        const comments = await Comentario.find({ lesson_id: lesson._id })
        console.log(lesson, comments);
        res.render('users/lesson', { title: titles.view.lessonView, usuario: user, leccion: lesson, comentarios: comments });
    },

};