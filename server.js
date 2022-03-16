const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/pending', express.static(path.join(__dirname, 'dist','index.html')));
app.use('/new', express.static(path.join(__dirname, 'dist','index.html')));
app.use('/project/*', express.static(path.join(__dirname, 'dist','index.html')));
app.get('/ping', function (req, res) {
    return res.send('pong');
});
app.listen(port);
