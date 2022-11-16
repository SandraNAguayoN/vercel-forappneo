
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

    //Ver todas las clases de la categoría de un idioma
    categoryView: async (req, res) => {
        const user = req.user;
        var category = req.query.name;
        const classes = await Clase.find({ language: category, published: "true" }).lean();
        res.render('users/category', { title: titles.view.categoryView, usuario: user, categoria: category, clases: classes });
    },

};

