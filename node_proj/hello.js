var bodyParser = require('body-parser');
var express = require('express');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.set('view engine','ejs');
app.set('views',__dirname+"/views");

var g_items = [
				{	id:1, name:"Javascript"},
				{	id:2, name:"PHP"},
				{	id:3, name:"Jquery"},
				{	id:4, name:"MySql"}
			];
app.post('/add',function(req, res){
		var name = req.body.language;
		g_items.push(
			{	
				id 	: 	g_items.length+1,
				name: 	name
			});
			 
		res.redirect('/aju');
});
app.get('/aju',function(req, res){
	res.render('index', {
		title	: 	'Aju John'	,
		items	: 	g_items
	});
});
app.listen(8080, function(){
	console.log('ready on port 8080');
});
