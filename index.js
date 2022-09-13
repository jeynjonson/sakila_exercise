const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json())
let router = express.Router();

const verifyJWT = require("./controller/verifyJWT");

//repository
let actorRepo = require('./repos/actorRepo');
let filmRepo = require('./repos/filmRepo');

//login
app.use("/login", require("./routes/auth"));
app.use(verifyJWT);

router.get('/getactor',(req, res) =>{
    actorRepo.get(function(data){
        res.send(data);
    });
});

router.get('/getfilm',(req, res) =>{
    filmRepo.get(function(data){
        res.send(data);
    });
});
/* Actor Modules */
//actor search
router.get('/search/firstname/',(req,res) => {
    let searchActor = {
        "actor" : req.query.actor
    };
    actorRepo.searchFirstName(searchActor,function(data){
        res.send(data);
    });
});

router.get('/search/lastname/',(req,res) => {
    let searchActor = {
        "actor" : req.query.actor
    };
    actorRepo.searchLastName(searchActor,function(data){
        res.send(data);
    });
});

//add actor
router.post('/actors/new/', (req,res)=> {
    let newActor = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "last_update":new Date()
    }
    actorRepo.addActor(newActor,(data)=>{
        res.send(data)
    });
});

//update actor
router.put('/actors/:id', (req,res)=>{
    let newActor = {
        "first_name":req.body.first_name,
        "last_name":req.body.last_name,
        "last_update":new Date()
    }
    actorRepo.updateActor(newActor, req.params.id,(data)=>{
        //res.send(data);
        if(data.affectedRows == 0){
            res.status(404).json({
                "message":"Actor ID not found",
            })
        } else {
            res.status(200).json({
                
                "message":"Actor details updated",
            });      
        }
    })
});

//delete actor
router.delete('/actors/:id', (req,res)=>{

    actorRepo.deleteActor(req.params.id,(data)=>{
        //res.send(data);
        if(data.affectedRows == 0){
            res.status(404).json({
                "message":"Actor ID not found",
            })
        } else {
            res.status(200).json({
                
                "message":"Actor details deleted",
            });      
        }
    })
});


/* Film Modules */

//get all films
router.get('/films/',(req, res) =>{
    filmRepo.get(function(data){
        res.send(data);
    });
});

//film search
router.get('/search/film/title/', (req,res) =>{
    let searchTitle = {
        "title" : req.query.p
    };
    filmRepo.searchFilmByTitle(searchTitle, (data)=>{
        res.send(data);
    });
    
});

router.get('/search/film/genre/', (req,res) =>{
    let searchGenre = {
        "genre" : req.query.p
    };
    filmRepo.searchFilmByGenre(searchGenre, (data)=>{
        res.send(data);
    });
    
});

router.get('/search/film/actor/', (req,res) =>{
    let searchActor = {
        "name" : req.query.p
    };
    filmRepo.searchFilmByActor(searchActor, (data)=>{
        res.send(data);
    });
    
});

router.get('/search/film/availability/', (req,res) =>{
    let searchTitle = {
        "title" : req.query.p
    };
    filmRepo.isAvailable(searchTitle, (data)=>{
        res.send(data);
    });
    
});

//add film
router.post('/films/new/', (req,res)=> {
    let newFilm = {
        "title":req.body.title,
        "description":req.body.description,
        "release_year":req.body.release_year,
        "length":req.body.length,
        "replacement_cost":req.body.replacement_cost,
        "rating":req.body.rating,
        "language_id":req.body.language_id,
        
    }
    filmRepo.addFilm(newFilm,(data)=>{
        res.send(data)
    });
});

//update film
router.put('/films/:id', (req,res)=>{
    let newFilm = {
        "title":req.body.title,
        // "description":req.body.description,
        // "release_year":req.body.release_year,
        // "language_id":req.body.language_id,
        // "length":req.body.length,
        // "replacement_cost":req.body.replacement_cost,
        // "rating":req.body.rating,
        // "special_features":req.body.special_features,
        "last_update": new Date()
    }
    filmRepo.updateFilm(newFilm, req.params.id,(data)=>{
        if(data.affectedRows == 0){
            res.status(404).json({
                "message":"Film ID not found",
            })
        } else {
            res.status(200).json({
                
                "message":"Film details updated",
            });      
        }
    })
});

//delete film
router.delete('/films/:id', (req,res)=>{

    filmRepo.deletFilm(req.params.id,(data)=>{
        //res.send(data);
        if(data.affectedRows == 0){
            res.status(404).json({
                "message":"Film ID not found",
            })
        } else {
            res.status(200).json({
                
                "message":"Film details deleted",
            });      
        }
    })
});




app.use('/api/',router);

var server = app.listen(5000, function(){
    console.log('Server Running on port 5000')
});