var express = require('express'),
    router = express.Router(),
    crypto = require("crypto"),
    User = require("../models/user"),
    check = require("../public/js/isLogin");
/* 注册模块 */
router.post("/reg",check.checkNotLogin);
router.post('/reg', function (req, res, next) {

  var name = req.body.name,
    password = req.body.password,
    password_re = req.body.password_repeat,
    email = req.body.email;

  if (password != password_re) {
    req.flash("error", "两次输入密码不一致！");
    return res.redirect("/users/reg");
  }
  var md5 = crypto.createHash("md5"),
    password = md5.update(password).digest("hex");

  var newUser = new User({
    name: name,
    password: password,
    email: email
  });

  User.get(newUser.name, function (err, user) {
    if (err) {
      req.flash("error", err);
      return res.redirect("/");
    }

    if (user) {
      req.flash("error", "用户已存在!");
      return res.redirect("/users/reg");
    }

    newUser.save(function (err, user) {
      console.log("返回数据：" + user);
      if (err) {
        req.flash("error", err);
        return res.redirect("/users/reg");
      }
      req.session.user = user;
      req.flash("success", "注册成功！");
      res.redirect("/");
    })


  })
});
router.get("/reg",check.checkNotLogin);
router.get('/reg', function (req, res, next) {
  res.render('reg', {
    title: '注册',
    user:req.session.user
  });
});
/* 登录模块 */
router.post("/login",check.checkNotLogin);
router.post('/login', function (req, res, next) {
  var name = req.body.name,
      password = req.body.password;
  var md5 = crypto.createHash("md5"),
    password = md5.update(password).digest("hex");

  var newUser = new User({
    name: name,
    password: password
  });
  User.get(newUser.name, function (err, user) {

    if (!user) {
      req.flash("error", "用户不存在!");
      return res.redirect("/users/login");
    }

   if (user.password!=password) {
      req.flash("error", "密码错误!");
      return res.redirect("/users/login");
    }
   req.session.user=user;
   req.flash("success", "登录成功!");
   res.redirect("/");
  })
});
router.get("/login",check.checkNotLogin);
router.get('/login', function (req, res, next) {
  res.render('login', {
    title: '登录页面' ,
    user:req.session.user
  });
});
/* 退出模块 */
router.get('/logout', function (req, res, next) {
  req.session.user=null;
  req.flash("success", "退出成功!");
  res.redirect("/");
});
module.exports = router;
