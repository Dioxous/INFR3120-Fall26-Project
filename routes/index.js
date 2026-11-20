var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Bug = require('../models/bug');

//read all database items and render home page
router.get('/', async(req, res, next) => {
    try{
        const allBugs = await Bug.find();
        res.render('index', {
            title: 'Home',
            allBugs: allBugs
        });
    }
    catch(err){
        console.error(err);
        res.render('error', {
            error: 'Error on server',
            title: 'Error'
        });
    }
});

//get add page
router.get('/bugs/add', async(req, res, next) => {
    try{
        res.render('bugs/add', {
            title: 'Add',
        });
    }
    catch(err){
        console.error(err);
        res.render('error', {title: 'Error', error: 'Error on server'});
    }
});

//create new database item
router.post('/bugs/add', async(req, res, next) => {
    try{
        let newBug = Bug({
            "appName": req.body.appName,
            "severity": req.body.severity,
            "title": req.body.title,
            "description": req.body.description
        });

        Bug.create(newBug).then(() => {res.redirect('/')});
    }
    catch(err){
        console.error(err);
        res.render('error', {
            error: 'Error on server',
            title: 'Error'
        });
    }
});

//get edit page
router.get('/bugs/edit/:id', async(req, res, next) => {
    try{
        const id = req.params.id;
        const bugEdit = await Bug.findById(id);
        res.render('bugs/edit', {
            title: 'Edit',
            Bug: bugEdit
        });
    }
    catch(err){
        console.error(err);
        next(err);
    }
})

//update edited item
router.post('/bugs/edit/:id', async(req, res, next) => {
    try{
        let id = req.params.id;
        let bugUpdated = Bug({
            "_id": id,
            "appName": req.body.appName,
            "severity": req.body.severity,
            "title": req.body.title,
            "description": req.body.description
        })

        Bug.findByIdAndUpdate(id, bugUpdated).then(() => {res.redirect('/')})
    }
    catch(err){
        console.error(err);
        res.render('error', {
            error: 'Error on server',
            title: 'Error'
        });
    }
})

//Delete item
router.get('/bugs/delete/:id', async(req, res, next) => {
    try{
        let id = req.params.id;
        Bug.deleteOne({_id:id}).then(() => {res.redirect('/')});
    }
    catch(err){
        console.error(err);
        res.render('error', {
            error: 'Error on server',
            title: 'Error'
        });
    }
})

module.exports = router;
