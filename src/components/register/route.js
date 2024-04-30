const express = require('express');
const router = express.Router();
const fs = require('fs');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/auth/register', function(req, res){
    model_view = {
        route_path: '/auth/register',
    }
    res.render('../views/register.pug', {isAuthenticated: req.session.isAuthenticated});
})

router.post('/auth/register', function(req, res){
    const {email, username, accountKey} = req.body;
    const userData = JSON.parse(fs.readFileSync('./database/user.json'));
    const doesExist = userData.users.some(q => q.username == username || q.email == email);
    if(!doesExist)
    {
        newUser = {
            email: email,
            username: username,
            accountKey: accountKey
        }
        user_db.model.users.push(newUser);
        user_db.update();
        res.redirect('/auth/register/success');
    }
    else
    {
        res.render('../views/register.pug', {errorMessage: 'Username or Email already exist. Please try again.', isAuthenticated: req.session.isAuthenticated});
    }
})


module.exports = router;