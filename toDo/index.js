	var express = require("express");
	var mongoose = require("mongoose");

	var app = express();
	var bodyParser = require("body-parser");


	mongoose.connect('mongodb://localhost:27017/todo', 
						function(error){
							if(!error) 
								console.log("connected");
						});
	ObjectId = mongoose.Types.ObjectId
	app.use(express.static(__dirname + '/public'));                 
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.urlencoded({'extended':true}));   

    
    // listen (start app with node index.js) ======================================
    app.listen(8080);
    console.log("App listening on port 8080");

    //Model
    var ToDo = mongoose.model('todo',{
    	text	: 	String,
    	status	: 	Boolean
    })

    //api starts----------------------------------------------------------------
    	//get all todos---------------------------------------------------------
    	app.get('/api/todos', function(req, res){
    		ToDo.find(function(err, todos){
    			if(err)
    				res.send(err);
    			res.json(todos);
    		});
    	});

    	//create todo---------------------------------------------------------
    	app.post("/api/todos", function(req, res){
    		ToDo.create({
    			text	: 	req.body.text,
    			status	: 	0
    		}, function(err, todo){
    				if(err)
    					res.send(err);
    				ToDo.find(function(err, todos){
    					if(err)
    						res.send(err);
    					res.json(todos);
    				})
    		})
    	});
    	// UPDATE STATUS a todo---------------------------------------------------
		app.put("/api/todos", function(req, res){
			ToDo.findOneAndUpdate({_id:req.body.todo_id},{status:req.body.status}, function(err, todo) {
				if(err)
					res.send(err);
				ToDo.find(function(err, todos){
					if(err)
						res.send(err);
					res.json(todos)
				});
			});
		});
    	// delete a todo---------------------------------------------------------
		app.delete("/api/todos/:todo_id", function(req, res){
			ToDo.remove({
				_id	: 	req.params.todo_id
			}, function(err, todo){
				if(err)
					res.send(err);
				ToDo.find(function(err, todos){
					if(err)
						res.send(err);
					res.json(todos)
				});
			});
		});
		app.get('*', function(req, res) {
	        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	    });