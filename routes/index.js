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
        console.log(err);
        res.render('error', { error: 'Error on server' });
    }
});

//get add page
router.get('/add', async(req, res, next) => {
    try{
        res.render('add', {
            title: 'Add',
        });
    }
    catch(err){
        console.log(err);
        res.render('error', { error: 'Error on server' });
    }
});

//create new database item
router.post('/add', async(req, res, next) => {
    try{
        let newBug = Bug({
            "appName": req.body.appName,
            "severity": req.body.severity,
            "title": req.body.title,
            "description": req.body.description
        })

        Bug.create(newBug).then(() => {res.redirect('/')})
    }
    catch(err){
        console.log(err);
        res.render('error', { error: 'Error on server' });
    }
});

module.exports = router;
