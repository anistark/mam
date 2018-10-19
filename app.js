var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

var helper = require('./helper');

app.use('/static', express.static('static'))

router.use(function(req, res, next) {
    console.log('=--> '+ req.method + " : " + req.url);
    next();
});

router.get("/", function(req, res) {
    res.sendFile(path + "index.html");
});

router.post("/mam/push", function(req, res) {
    console.log('body:', req.body);
    // helper.mamPublish(req.body, function (mamResponseData) {
    //     console.log('mamResponseData:', mamResponseData);
    //     res.status(200).json(mamResponseData)
    // });
    res.status(200).json({})
});

router.post("/mam/fetch", function(req, res) {
    helper.mamFetch(req.body, function (mamResponseData) {
        console.log('mamResponseData:', mamResponseData);
        res.status(200).json(mamResponseData)
    });
});

app.use("/", router);

app.use("*", function(req, res) {
    // res.sendFile(path + "404.html");
    res.status(404).json({
        'error': 'Page Not Found!'
    })
});

app.listen(3000, function() {
    console.log("Live at Port 3000");
});
