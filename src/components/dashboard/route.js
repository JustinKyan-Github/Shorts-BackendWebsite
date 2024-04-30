const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/video/dashboard/', function(req, res){
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
        res.render('../views/dashboard.pug', {isAuthenticated: req.session.isAuthenticated});
    }
})

router.get('/video/dashboard/:videofilter', function(req, res){
    if(req.session.isAuthenticated)
    {
        let videofilter = req.params.videofilter;
        let rawdata = fs.readFileSync('./database/videos.json');
        let video = JSON.parse(rawdata);
        if(videofilter == 'all')
        {
            
            res.render('../views/dashboard.pug', {videoList: video['videos'], isAuthenticated: req.session.isAuthenticated});
        }
        else if(videofilter == 'mine')
        {
            let filteredVideos = video['videos'].filter(q => q.uploader.includes(req.session.username || req.session.email));
            res.render('../views/dashboard.pug', {videoList: filteredVideos, isAuthenticated: req.session.isAuthenticated});
        }
        else
        {
            res.render('../views/dashboard.pug', {videoList: [], isAuthenticated: req.session.isAuthenticated});
        }
    }
    else
    {
        model_view = 
        {
            route_path: '/auth/login',
            notAuthenticated: true
        }
        res.render('../views/login.pug', {model_view, isAuthenticated: req.session.isAuthenticated});
    }
})

router.post('/video/dashboard/', function(req, res){
    if(req.body.filter == 'all')
    {
        res.redirect('/video/dashboard/all');
    }
    else if(req.body.filter == 'mine')
    {
        res.redirect('/video/dashboard/mine');
    }
})

module.exports = router;