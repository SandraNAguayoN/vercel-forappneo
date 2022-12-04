const express = require('express');
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Usuario = require("../models/userModel.js");
const Publicacion = require("../models/publicationModel.js");
const titles = require('../config/titles');

const multer = require('multer');
const fs = require('fs');
const path = require('path');


module.exports = {

    //Ir al la pantalla de crear publicacion
    createPublicationView: async (req, res) => {
        const user = req.user;
        res.render('users/create_publication', { title: titles.view.createPublicationView, usuario: user });
    },

    //Crear publicacion
    createPublication: async (req, res) => {
        console.log(req.body);
        const publication = new Publicacion(req.body);
        await publication.save();
        req.flash('success_msg', 'Publicación creada');
        res.redirect('/users/home');
    },

    //Ir a la pantalla de editar publicacion
    editPublicationView: async (req, res) => {
        const user = req.user;
        const publication = await Publicacion.findById(req.query.id).lean();
        console.log(publication);
        res.render('users/edit_publication', { title: titles.view.editPublicationView, usuario: user, publicacion: publication });
    },

    //Editar una publicacion
    editPublication: async (req, res) => {
        const { id } = req.params;
        await Publicacion.updateOne({ _id: id }, req.body);
        req.flash('success_msg', 'Publicación actualizada');
        res.redirect('/users/home');
    },


    //Eliminar una publicacion
    deletePublication: async (req, res) => {
        var { id } = req.params;
        await Publicacion.remove({ _id: id });
        req.flash('success_msg', 'Publicación eliminada');
        res.redirect('/users/home');
    },

    //Ver contenido de una publicacion creada por el usuario
    myPublicationsView: async (req, res) => {
        const user = req.user;
        const publication = await Publicacion.findById(req.query.id).lean();
        console.log(publication);
        res.render('users/my_publications', { title: titles.view.publicationView, usuario: user, publicacion: publication });
    },


    //Ver contenido de una publicacion disponible 
    publicationView: async (req, res) => {
        const user = req.user;
        const publication = await Publicacion.findById(req.query.id).lean();
        console.log(publication);
        res.render('users/publication', { title: titles.view.publicationView, usuario: user, publicacion: publication });
    },

};