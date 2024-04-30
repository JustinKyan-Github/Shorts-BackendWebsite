const express = require('express');
const router = express.Router();
const fs = require('fs');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', function(req, res){
    model_view = 
    {
        route_path: '/auth/login',
    }
    res.render('../views/login.pug', {model_view, isAuthenticated: req.session.isAuthenticated});
})

router.get('/auth/login', function(req, res){
    model_view = 
    {
        route_path: '/auth/login',
    }
    res.render('../views/login.pug', {model_view, isAuthenticated: req.session.isAuthenticated});
})

router.post('/', function(req, res){
    const {userIdentifier, accountKey} = req.body
    const userData = JSON.parse(fs.readFileSync('./database/user.json'));
    const emailDoesExist = userData.users.some(q => q.email == userIdentifier && q.accountKey == accountKey);
    const usernameDoesExist = userData.users.some(q => q.username == userIdentifier && q.accountKey == accountKey);
    if(emailDoesExist || usernameDoesExist)
    {
        if(emailDoesExist)
        {
            userEntry = userData.users.find(q => q.email == userIdentifier);
            req.session.username = userEntry.username;
            req.session.email = userEntry.email;
        }
        else if(usernameDoesExist)
        {
            userEntry = userData.users.find(q => q.username == userIdentifier);
            req.session.email = userEntry.email;
            req.session.username = userEntry.username;
        }
        req.session.userIdentifier = userIdentifier;
        req.session.accountKey = accountKey;
        req.session.isAuthenticated = true;
        res.redirect('/video/dashboard');
    }
    else
    {
        res.render('../views/login.pug', {errorMessage: 'Incorrect login credentials. Please try again.', isAuthenticated: req.session.isAuthenticated});
    }
})

router.post('/auth/login', function(req, res){
    const {userIdentifier, accountKey} = req.body
    const userData = JSON.parse(fs.readFileSync('./database/user.json'));
    const emailDoesExist = userData.users.some(q => q.email == userIdentifier && q.accountKey == accountKey);
    const usernameDoesExist = userData.users.some(q => q.username == userIdentifier && q.accountKey == accountKey);
    if(emailDoesExist || usernameDoesExist)
    {
        if(emailDoesExist)
        {
            userEntry = userData.users.find(q => q.email == userIdentifier);
            req.session.username = userEntry.username;
            req.session.email = userEntry.email;
        }
        else if(usernameDoesExist)
        {
            userEntry = userData.users.find(q => q.username == userIdentifier);
            req.session.email = userEntry.email;
            req.session.username = userEntry.username;
        }
        req.session.userIdentifier = userIdentifier;
        req.session.accountKey = accountKey;
        req.session.isAuthenticated = true;
        res.redirect('/video/dashboard');
    }
    else
    {
        res.render('../views/login.pug', {errorMessage: 'Incorrect login credentials. Please try again.', isAuthenticated: req.session.isAuthenticated});
    }
})

module.exports = router;