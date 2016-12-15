/**
 * Created by jo on 16/11/11.
 */
var checkLogin=function(req,res,next) {
    console.log("我进来了吧1")
    if(!req.session.user){
        req.flash("error","未登录!");
        return res.redirect("/users/login");
    }
    next();
};
var checkNotLogin=function(req,res,next) {
    console.log("我进来了吧2")
    if(req.session.user){
        req.flash("error","已登录!");
        return res.redirect("back");
    }
    next();
};
module.exports.checkLogin=checkLogin;
module.exports.checkNotLogin=checkNotLogin;

