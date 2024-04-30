const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/video/new_video', function(req, res){
    if(!req.session.isAuthenticated)
    {
        model_view = 
        {
            route_path: '/auth/login',
            notAuthenticated: true
        }
        res.render('../views/login.pug', model_view);
    }
    else
    {
        res.render('../views/upload.pug', {isAuthenticated: req.session.isAuthenticated});
    }
})

router.post('/video/new_video', function(req, res){
    if(!req.session.isAuthenticated)
    {
        model_view = 
        {
            route_path: '/auth/login',
            notAuthenticated: true
        }
        res.render('../views/login.pug', model_view);
    }
    else if(req.session.isAuthenticated && req.session.username != null)
    {
        const {url, title} = req.body
        newVideo = {
            uploader: req.session.userIdentifier,
            url: url,
            title: title
        }
        video_db.model.videos.push(newVideo);
        video_db.update();
        const uploadSuccess = true;
        res.render('../views/upload.pug', {uploadSuccess, isAuthenticated: req.session.isAuthenticated });
    }
    else
    {
        model_view = 
        {
            route_path: '/auth/login',
            notAuthenticated: true
        }
        res.render('../views/login.pug', model_view);
    }
})

module.exports = router;
