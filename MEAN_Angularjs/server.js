var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/angularjs');

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    location: String,
    phone: String,
    UserType: String
});

var model_user = mongoose.model('users',userSchema);

app.post('/register',function(req,res){
    console.log('register called');
    model_user.find({"email":req.body.email},function(err,data){
        if(err){
            console.log('err in fetching user info');
        }else{
            if(data.length != 0){
                res.send({
                    flg:'fail'
                })
            }else{
                var user_data = {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                    location: req.body.location,
                    phone:req.body.phone,
                    UserType: req.body.usertype
                }
                var user = model_user(user_data);
                user.save(function(err){
                    if(err){
                        console.log('update failed');
                    }else{
                        res.send({
                            flg:'success'
                        })
                    }
                })
            }
        }
    })   
});
app.post('/login',function(req,res){
    console.log('login called');
    var user_data = {
        email: req.body.email,
        password: req.body.password
    }
    model_user.find(user_data,function(err,data){
        if(err){
            console.log("Error in getting user info");
        }else{
            if(data.length == 0){
                res.send({
                    flg: 'fail'
                })
            }else{
                res.send({
                    flg:'existed',
                    type:data[0].UserType
                })
            }
        }
    })
});

var jobSchema = new mongoose.Schema({
    title: String,
    description:String,
    location: String,
    keyword: String
})

var model_job = mongoose.model('jobs',jobSchema);

app.post('/post',function(req,res){
    console.log('post called');
    var job_data = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        keyword: req.body.keyword
    }
    
    var job = model_job(job_data);
    job.save(function(err){
        if(err){
            console.log('save job failed');
        }else{
            res.send({
                flg: 'success'
            })
        }
    })
});

app.post('/search',function(req,res){
    console.log('search called');
    model_job.find(req.body,function(err,data){
        if(err){
            console.log('error in searching jobs');
        }else{
            res.send(data);
        }
    })
});

var savejob = new mongoose.Schema({
    email: String,
    title: String,
    location: String,
    description: String
});
var model_save = mongoose.model('savejobs',savejob);
app.post('/savejobs',function(req,res){
    console.log('save job');
    var job_data = {
        email: req.body.email,
        title: req.body.title,
        location: req.body.location,
        description: req.body.description
    };

    var job = model_save(job_data);
    job.save(function(err){
        if(err){
            console.log('save job failed');
        }else{
            res.send({
                flg: 'success'
            })
        }
    });
});

var model_apply = mongoose.model('applyjobs',savejob);
app.post('/applyjob',function(req,res){
    console.log('apply job');
    var job_data = {
        email: req.body.email,
        title: req.body.title,
        location: req.body.location,
        description: req.body.description
    };

    var job = model_apply(job_data);
    job.save(function(err){
        if(err){
            console.log('apply job failed');
        }else{
            res.send({
                flg: 'success'
            })
        }
    });
});

app.post('/searchSaved',function(req,res){
    console.log('serachSaved');
    model_save.find(req.body,function(err,data){
        if(err){
            console.log('error in searching jobs');
        }else{
            res.send(data);
        }
    });
});

app.post('/searchApplied',function(req,res){
    console.log('searchApplied');
    model_apply.find(req.body,function(err,data){
        if(err){
            console.log('error in searching jobs');
        }else{
            res.send(data);
        }
    });
});

app.listen(3000,function(){
    console.log('Server running');
});
