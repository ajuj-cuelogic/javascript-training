var bodyParser = require('body-parser');
var express = require('express');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.set('view engine','ejs');
app.set('views',__dirname+"/views");

var g_items = [
				{id:1, name:"Javascript"},
				{id:2, name:"PHP"},
				{id:3, name:"Jquery"},
				{id:4, name:"MySql"}
		];
app.post('/add',function(req, res){
		var name = req.body.language;
		//res.send("language added as : "+name);
		var langs = req.body.oldLang;
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
	console.log('ready on port 8080')
})

/*var fileSystem = require('fs');
fileSystem.readFile('exp.txt', function(err, data){
	if(err) throw err;
	var text = data.toString();
	//console.log(txt); 
	var results = {};

// Break up the file into lines.
  var lines = text.split('\n');
  
lines.forEach(function(line) {
    var parts = line.split(' ');
    var letter = parts[1];
    var count = parseInt(parts[2]);
    
if(!results[letter]) {
      results[letter] = 0;
    }
    
results[letter] += parseInt(count);
  });
  
console.log(results);
});*/
