var express = require('express'),
	app = express(),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser');
	
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/marlabs');

var userSchema = mongoose.Schema({
	firstname:{
		type: String,
		required:[true,'must fill in firstname']
	},
	lastname:String
});

var model_user = mongoose.model('assignment',userSchema);
app.get('/',function(req,res){
	res.sendFile(__dirname+'/form.html');
});

app.post('/savedata',function(req,res){
	var newUser = model_user({
		firstname: req.body.fname,
		lastname: req.body.lname
	})
	newUser.save(function(err){
		if(!err){
			console.log("new item added");
		}
	})
	res.redirect('/');
});

app.listen(3000,function(){
	console.log("server connected");
});
