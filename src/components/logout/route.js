const express = require('express');
const router = express.Router();

router.get('/auth/logout', function(req, res){
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
            res.send(err)
        }
        else
        {
            model_view = 
            {
                route_path: '/auth/login',
            }
            res.render('../views/login.pug', model_view);
        }
    })
})

router.post('/auth/logout', function(req, res){
    model_view = 
    {
        route_path: '/auth/login',
    }
     res.render('../views/login.pug', model_view);
})

module.exports = router;