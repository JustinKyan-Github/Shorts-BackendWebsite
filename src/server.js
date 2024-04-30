const express = require('express');
const session = require('express-session');
let app = express();

userDbConn = __dirname + "/database/user.json";
videoDbConn = __dirname + "/database/videos.json"
userDbSchema = 
{
    users : [],
}
videoDbSchema = 
{
    videos : []
}

global.user_db = require("./components/dbModule/fsdb.js")(userDbConn, userDbSchema);
global.video_db = require("./components/dbModule/fsdb.js")(videoDbConn, videoDbSchema);

app.use(session({
    secret: 'SomeSecretCode##LoadFromEnviromentVariable',
    saveUninitialized:true,
    resave:false,
    cookie: { maxAge: 3456000000 }})
)
//[process.env.SESSION_SECRET]
const loginComponent = require('./components/login/route.js');
const registerComponent = require('./components/register/route.js');
const dashboardComponent = require('./components/dashboard/route.js');
const addVideoComponent = require('./components/add-video/route.js');
const logoutComponent = require('./components/logout/route.js');
const accountRegisteredComponent = require('./components/accountRegistered/route.js');

app.use('/', loginComponent);
app.use('/', registerComponent);
app.use('/', dashboardComponent);
app.use('/', addVideoComponent);
app.use('/', logoutComponent);
app.use('/', accountRegisteredComponent);

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
})