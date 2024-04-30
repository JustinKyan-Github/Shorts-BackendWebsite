const express = require('express');
const router = express.Router();

router.get('/auth/register/success', function(req, res){
    res.render('../views/accountRegistered.pug', {isAuthenticated: req.session.isAuthenticated});
})

module.exports = router;