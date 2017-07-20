const express = require('express');
const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname  + '/views/partials')
app.set('view engine','hbs');


app.use((req, res, next) => {
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log',log + '\n');
next();
});

//app.use((req,res,next)=>
//{
  //res.render('maintenance.hbs');
//  });


hbs.registerHelper('getCurrentYear', () =>
{
  return 'test';
  //return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>
{
  return text.toUpperCase();
});

app.get('/',(req, res) =>
{

res.render('home.hbs', {
  pageTitle : 'Home page',
  WelcomeMessage  : 'My demo website',
  currentYear  : new Date().getFullYear()
});
});


app.get('/about', (req,res) =>
{
  res.render('about.hbs', {
    pageTitle : 'About Page',
    currentYear  : new Date().getFullYear()
  });
});


// bad - send back json with errorMessage

app.get('/bad', (req,res) =>
{
  res.send({
    errorMessage : 'Unable to handle request'

  });

});

app.listen(port,() =>
{
  console.log(`Server is now running on Local host ${port}`);
});
