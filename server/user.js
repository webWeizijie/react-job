const express = require('express')
const Router = express.Router()
const models = require('./model')
const utils = require('utility')
const User = models.getModel('user');
const Chat = models.getModel('chat');

Router.get('/list', function (req, res) {
    const type = req.query.type;
    User.find({
        type
    }, function (err, doc) {
        return res.json({
            doc,
            code: 0
        })
    })
})
Router.post('/register', function (req, res) {
    const {
        user,
        pwd,
        type
    } = req.body
    User.findOne({
        user: user
    }, function (err, doc) {
        if (doc) {
            return res.json({
                code: 1,
                msg: '用户名重复'
            })
        }
        User.create({
            user,
            pwd: md5Pwd(pwd),
            type
        }, function (e, d) {
            if (e) {
                return res.json({
                    code: 1,
                    msg: '后端出错了'
                })
            }
            res.cookie('userId', d._id)
            return res.json({
                code: 0
            })
        })
    })
})
Router.get('/info', function (req, res) {

    const {
        userId
    } = req.cookies;
    if (!userId) {
        return res.json({
            code: 1
        })
    }
    User.findOne({
        _id: userId
    }, function (err, doc) {
        if (!doc) {
            return res.json({
                code: 1
            })
        } else {
            doc.pwd = 0;
            return res.json({
                code: 0,
                doc
            })
        }
    })
})
Router.post('/login', function (req, res) {
    const {
        user,
        pwd
    } = req.body

    User.findOne({
        user
    }, function (err, doc) {
        if (!doc) {
            return res.json({
                code: 1,
                msg: '没有此用户'
            })
        } else {
            if (md5Pwd(pwd) === doc.pwd) {
                doc.pwd = 0
                res.cookie('userId', doc._id)
                return res.json({
                    code: 0,
                    doc
                })
            } else {
                return res.json({
                    code: 1,
                    msg: '密码错误'
                })
            }

        }
    })
})
Router.post('/update', function (req, res) {
    const userId = req.cookies.userId
    if (!userId) {
        return res.json.dumps({
            code: 1
        })
    }
    const body = req.body;
    User.findByIdAndUpdate(userId, body, function (err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({
            code: 0,
            data
        })
    })
})

Router.get('/getmsgList',function(req,res){
    const userId = req.cookies.userId

    User.find({},function(e,userdoc){
        let users = {}
        userdoc.forEach((v)=>{
            users[v.id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:userId},{to:userId}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users})
            }
            
        })
    })
   
})

Router.post('/readmsg',function(req,res){
    const userid = req.cookies.userId;
    const {from} = req.body;
    console.log(userid,from)
    Chat.update({from,to:userid},{'$set':{read:true}},{'multi':true},function(err,doc){
        console.log(doc)
        if(!err){
            return res.json({code:0,num:doc.nModified})
        }
        return res.json({code:1,msg:'修改失败'})
    })
})

function md5Pwd(pwd) {
    const salt = 'job_3544x8yza6!@#IUHJH~~';
    return utils.md5(utils.md5(pwd + salt))
}
module.exports = Router