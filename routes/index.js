var express = require('express'),
    router = express.Router(),
    Post = require("../models/post");

/* GET home page. */
router.get('/', function (req, res, next) {
    var array=null;
    Post.get(null,3, function (err, posts) {
        if (err) {
            posts = [];
        }
        array=posts;
        res.render('index', {
            title: '团队介绍',
            user: req.session.user,
            posts: array
        });
    })


});

module.exports = router;
