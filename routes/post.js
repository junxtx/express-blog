/**
 * Created by jo on 16/11/11.
 */
var express = require('express'),
    router = express.Router(),
    crypto = require("crypto"),
    Post = require("../models/post"),
    check = require("../public/js/isLogin");

router.get("/publish",check.checkLogin);
router.get("/publish",function (req,res,next) {
    var array=null;
    Post.get({name:req.session.user.name},4, function (err, posts) {
        if (err) {
            posts = [];
        }
        array=posts;
        res.render('publish', {
            title: '发表文章',
            user: req.session.user,
            posts: array
        });
    })
})
router.post("/publish",check.checkLogin);
router.post("/publish",function (req,res) {
    var currentUser=req.session.user,
        post=new Post(currentUser.name,req.body.title,req.body.tag,req.body.content);
    post.save(function (err) {
        if(err){
            req.flash("error",err);
            return res.redirect("/");
        }
        req.flash("success","发布成功!");
        return res.redirect("/");
    })

})

router.get("/life",function (req,res) {

    var array=null;
    Post.get({tag:"1"},10, function (err, posts) {
        if (err) {
            posts = [];
        }
        array=posts;
        res.render('life', {
            title: '团队生活',
            user: req.session.user,
            posts: array
        });
    })
})
router.get("/tech",function (req,res) {

    var array=null;
    Post.get({tag:"2"},10, function (err, posts) {
        if (err) {
            posts = [];
        }
        array=posts;
        res.render("tech",{
            title:"技术周刊",
            user:req.session.user,
            posts: array
        })
    })

})
router.get("/detail",function (req,res) {
    var array=null;
    Post.getOne(req.query.id, function (err, post) {
        if (err) {
            post =null;
        }
        //console.log(post.tag)
        Post.get({tag:"4"},4, function (err, posts) {
            if (err) {
                posts = [];
            }
            array=posts;
            res.render("detail",{
                title:"文章详情",
                user:req.session.user,
                post:post,
                posts:posts
            })
        })

    })

})
module.exports = router;