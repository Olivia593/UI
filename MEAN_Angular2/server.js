var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/marlabs');

var userSchema = new mongoose.Schema({
    email:String,
    password:String
})

var model_user = mongoose.model('users',userSchema);
app.use(cors({
	origin: 'http://localhost:4200',
	optionsSuccessStatus: 200
}));

app.post('/register',function(req,res){
    console.log('register is working');
    if(req.body.email && req.body.password){
        var token = jwt.sign({
            email:req.body.email
        },
        'marlabs-secret-key',
        {expiresIn:'1h'}
        );
        var user_data = {
            email:req.body.email,
            password : req.body.password
        }
        var user1 = model_user(user_data);
        user1.save(function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('Data saved!!!');
                // db.close();
            }
        });
        res.send({
            isLoggedIn: true,
            msg:'Login success',
            token: token
        });
    }else{
        res.send({
            isLoggedIn:false,
            msg:'Login failed'
        });
    }
});
app.post('/login',function(req,res){
    var isFind = false;
    model_user.find({"email":req.body.email, "password": req.body.password},function(err, data) {
		if(err) {
			console.log("Error occurred");
		} else {
			var data_len = data.length;
			if(data_len==0) {
				console.log("No matching records found");
			} else {

                isFind = true;
                console.log(isFind);
				// var arr = [];
				// res.forEach(function(record){
				// 	if(record!=null) {
				// 		arr.push(record);
				// 	} else {
				// 		res.send(arr);
				// 	}
				//     console.log(record);
				// });
            }
            if(isFind){
                var token = jwt.sign({
                    email:req.body.email
                },
                'marlabs-secret-key',
                {expiresIn:'1h'}
                );
                res.send({
                    isLoggedIn: isFind,
                    msg:'Login success',
                    token: token
                });
            }else{
                res.send({
                    isLoggedIn:false,
                    msg:'Login failed'
                });
            }
		}
	});

    console.log('login is working');

});
app.use(function(req,res,next){
    var token = req.body.token || req.query.token || req.headers.token;
    if(token){
        jwt.verify(token,'marlabs-secret-key',function(err,decoded){// decoded: everything 
            if(!err){
                console.log(decoded);
                req.decoded = decoded;
                next();// go the next step to getproducts
            }else{
                res.send({
                    msg:'Invalid request',
                    isLoggedIn: false
                });
            }
        });
    }else{
        res.send({
            msg:'Invalid request',
            isLoggedIn: false
        });
    }
 });
var postSchema = new mongoose.Schema({
    title:String,
    description:String
})

var model_post = mongoose.model('posts',postSchema);
app.post('/createpost',function(req,res){
    console.log('create post server');
    // console.log(req.body.postTitle);
    var post_data = {
        title : req.body.postTitle,
        description : req.body.postDes
    };
    model_post.find({"title":req.body.postTitle},function(err,data){
        if(err){
            console.log('error in fetching data');
        }else{
            console.log('check like status')
            // console.log(data);
            var data_len = data.length;
            if(data_len == 0){
                var newPost = model_post(post_data);
                newPost.save(function(err){
                    if(!err){
                        console.log('new like added');
                    }
                });
            }else{
                console.log('the post has been added');
            }  
        }  
    });
});

 app.get('/getposts',function(req,res){
    console.log("getpost works"); 
    model_post.find(function(err,data){
        if(err){
            console.log('error in fetching data');
        }else{
            console.log('get the post')
            var data_len = data.length;
            var arr = [];
            data.forEach(function(record){
                if(record!=null){
                    arr.push(record);
                }else{
                    data.send(arr);
                }
            })
            res.send(arr);
        }
    });
 });
var commentSchema = new mongoose.Schema({
    title:String,
    comments:String
})

var model_comment = mongoose.model('comments',commentSchema);
app.post('/getcomments',function(req,res){
    console.log("getcomments works"); 
    model_comment.find({"title":req.body.title},function(err,data){
        console.log(req.body.title);
        if(err){
            console.log('error in fetching data');
        }else{
            console.log('get the post')
            // console.log(data);
            var data_len = data.length;
            var arr = [];
            data.forEach(function(record){
                if(record!=null){
                    arr.push(record);
                }else{
                    data.send(arr);
                }
            })
            // console.log(arr)
            res.send(arr);
        }
    });
 });

app.post('/createcomments',function(req,res){
    console.log('create post server');
    // console.log(req.body.postTitle);
    var post_data = {
        title : req.body.title,
        comments : req.body.comment
    };
    var newPost = model_comment(post_data);
    newPost.save(function(err){
        if(!err){
            console.log('new post added');
        }
    });
});
var likeSchmea = mongoose.Schema({
    title: String,
    email: String
});
var model_like = mongoose.model('like',likeSchmea);
app.post('/addlike',function(req,res){
    console.log('create like');
    // console.log(req.body.postTitle);
    var post_data = {
        title : req.body.title,
        email: req.body.email
    };
    model_like.find({"title":req.body.title,"email":req.body.email},function(err,data){
        // console.log(req.body.title);
        var isExisted = false;
        if(err){
            console.log('error in fetching data');
        }else{
            console.log('check like status')
            // console.log(data);
            var data_len = data.length;
            if(data_len == 0){
                var newPost = model_like(post_data);
                newPost.save(function(err){
                    if(!err){
                        console.log('new like added');
                    }
                });
            }else{
                console.log('the user has added like');
            }  
        }
    });
    model_like.find({"title":req.body.title},function(err,list){
            var arr = [];
            list.forEach(function(record){
                if(record!=null){
                    arr.push(record);
                }else{
                    list.send(arr);
                }
            })
            console.log(arr)
            res.send(arr);
    });
});
 app.listen(3000, function() {
    console.log("Server running on port 3000!")
});