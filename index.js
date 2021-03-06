const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection

db.once('open', () => {
    console.log("MongoDB Connected")
})

// Check db errors

db.on('error', (err) => {
    console.log(err)
});

//Init app
const app = express();

let Article = require('./models/articles')

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

// Home Route
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if(err){
            console.log(err)
        }
        else{
            res.render('index', {
                title:'Articles',
                articles: articles
            });
        }
    })
});

// Add route
app.get('/articles/add', (req, res) => {
    res.render('addarticle', {
        title:'Add Article'
    });
})

app.listen(3000, () => {
    console.log('Server started on port 3000...')
})