/**
 * Created by tolgadane on 1/9/17.
 */
var express = require ('express');
var stylus =require ('stylus');
var logger=require('morgan');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');

var env=process.env.NODE_ENV=process.env.NODE_ENV || 'development';

var app= express();

function compile(str,path){
    return stylus(str).set('filename', path);
}

console.log ('Node Environment : '+env);

app.set ('view engine', 'jade');
app.set ('views', 'server/views');

app.use(logger('dev'));
app.use(express.static(__dirname+'/public'));
app.use(stylus.middleware(
    {
        src : __dirname+'/public',
        compile: compile
    }
));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(env==='development'){
    mongoose.connect('mongodb://localhost/multivision');
}else{
    mongoose.connect('mongodb://tlgdane:multivision@ds159978.mlab.com:59978/multivision');
}

var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error...'));
db.once('open', function callback(){
    console.log('multivision database is open...');
});

var messageSchema=mongoose.Schema({message: String});

var Message=mongoose.model('Message', messageSchema);

var mongoMessage;

Message.findOne().exec(function(err,messageDoc){
    mongoMessage=messageDoc.message;
});



app.get('/partials/:partialsPath', function(req, res){
    res.render('partials/'+req.params.partialsPath);
});

app.get("*", function(req,res){
    res.render('index',{mongoMessage: mongoMessage});
});



var port=process.env.PORT || 3000;

app.listen(port, function(){
    console.log('web server listening port 3000');
});

