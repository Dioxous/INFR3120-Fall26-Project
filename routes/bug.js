var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Bug = require('../models/bug');

//get home page
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
        res.render('index', { error: 'Error on server' });
    }
});