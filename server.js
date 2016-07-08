var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    res.render('index');
});

app.listen(port, function () {
    console.log('App is running on port:' + port);
});
