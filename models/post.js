var mongodb = require("./db"),
  ObjectID = require("mongodb").ObjectID;
function Post(name,title,tag,content){
    this.name=name;
    this.title=title;
    this.tag=tag;
    this.content=content;
};

module.exports=Post;
//存储用户信息
Post.prototype.save=function(callback){
    var date=new Date();
    var time={
        date:date,
        year:date.getFullYear(),
        month:date.getFullYear()+"-"+(date.getMonth()+1),
        day:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
        minute:date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes()<10?'0'+
               date.getMinutes():date.getMinutes())
    };
    var post={
        name:this.name,
        time:time,
        title:this.title,
        tag:this.tag,
        content:this.content,
        pv:0
    }

//打开数据库
mongodb.open(function(err,db){
    if(err){
        return callback(err);
    }
    db.collection("posts",function(err,collection){
        if(err){
            mongodb.close();
            return callback(err);
        }
        collection.insert(post,{
            safe:true
        },function(err){
            mongodb.close();
            if(err){
                return callback(err);
            }
            callback(null);
        });
    });
});
};
//读取用户信息

Post.get=function(tips,num,callback){

    mongodb.open(function(err,db){
    if(err){
        return callback(err);
    }
    db.collection("posts",function(err,collection){
        if(err){
            mongodb.close();
            return callback(err);
        }
        var query={};
        if(tips){
            query=tips;
        }
        collection.find(query,{
            limit:num
        }).sort({
            time:-1
        }).toArray(function (err,docs) {
            mongodb.close();
            if(err){
                return callback(err);
            }
            //console.log(docs);
            callback(null,docs)//成功!以数组的形式返回查询的结果
        });
    });
});
}
Post.getOne=function(id,callback){

    mongodb.open(function(err,db) {
        if (err) {
            return callback(err);
        }
        db.collection("posts", function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findOne({"_id": new ObjectID(id)}, function (err, doc) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                }
                if(doc){
                    //每访问1次,pv值加1
                    collection.update({

                        "_id": new ObjectID(id)
                    },{

                        $inc:{"pv":1}
                    },function (err,doc) {

                        mongodb.close();
                        if(err){
                            return callback(err);
                        }
                    });
                    callback(null, doc)//成功!返回单个数据
                }


            })
        });
    })
}
