const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');
var app = express();



const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname +'/views/partials');

//allows
app.set('view engine', 'hbs');





app.use((req,res, next)=>{
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`
	console.log(log);
	fs.appendFile('server.log', log + '\n',(err) => {
		if (err){
			console.log('Unable to append to server log');
		}
	});
	//lets the application know to move on
	next();
});

// //maintenance middleware
// app.use((req,res, next)=>{
// 	res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});



hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});
//set up http route handler
//first argument / for root
//request: stores informatin about the request header, body
//response: respond to request, how to respond back
app.get('/', (req, res)=>{
	// res.send('<h1>hello</h1>');
	res.render('home.hbs', {
		pageTitle:'Home Page',
		welcomeMessage: 'Welcome to my website',
	
	});
});

app.get('/about', (req, res)=>{
	res.render('about.hbs',{
		pageTitle:'About Page',
		
	});
});


app.get('/project', (req, res) => {
	res.render('project.hbs', {
		pageTitle: 'Projects'
	});
});

// bad - send back json with errorMessage
app.get('/bad',(req,res)=>{
	res.send({
		errorMessage: 'Unable to handle request'
	});
});

//bind a port to our machine
app.listen(port, ()=>{
	console.log(`Server is up on port ${port}`);
});













