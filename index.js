const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json())
let router = express.Router();

const verifyJWT = require("./controller/verifyJWT");
const adminJWT = require('./controller/adminJWT');

//repository
let actorRepo = require('./repos/actorRepo');
let filmRepo = require('./repos/filmRepo');

//login
app.use("/login", require("./routes/auth"));
//app.use("/public/",verifyJWT);
//app.use(adminJWT);

router.get('/getactor', verifyJWT, (req, res) =>{
    actorRepo.get(function(data){
        res.send(data);
    });
});

router.get('/getfilm',verifyJWT,(req, res) =>{
    filmRepo.get(function(data){
        res.send(data);
    });
});
/* Actor Modules */
//actor search
router.get('/search/firstname/',verifyJWT,(req,res) => {
    let searchActor = {
        "actor" : req.query.actor
    };
    actorRepo.searchFirstName(searchActor,function(data){
        res.send(data);
    });
});

router.get('/search/lastname/',verifyJWT,(req,res) => {
    let searchActor = {
        "actor" : req.query.actor
    };
    actorRepo.searchLastName(searchActor,function(data){
        res.send(data);
    });
});

//add actor
router.post('/actors/new/',adminJWT, (req,res)=> {
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
router.put('/actors/:id',adminJWT, (req,res)=>{
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
router.delete('/actors/:id', adminJWT, (req,res)=>{

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
router.get('/films/',verifyJWT, (req, res) =>{
    filmRepo.get(function(data){
        res.send(data);
    });
});

//film search
router.get('/search/film/title/', verifyJWT, (req,res) =>{
    let searchTitle = {
        "title" : req.query.p
    };
    filmRepo.searchFilmByTitle(searchTitle, (data)=>{
        res.send(data);
    });
    
});

router.get('/search/film/genre/',verifyJWT, (req,res) =>{
    let searchGenre = {
        "genre" : req.query.p
    };
    filmRepo.searchFilmByGenre(searchGenre, (data)=>{
        res.send(data);
    });
    
});

router.get('/search/film/actor/',verifyJWT, (req,res) =>{
    let searchActor = {
        "name" : req.query.p
    };
    filmRepo.searchFilmByActor(searchActor, (data)=>{
        res.send(data);
    });
    
});

router.get('/search/film/availability/',verifyJWT, (req,res) =>{
    let searchTitle = {
        "title" : req.query.p
    };
    filmRepo.isAvailable(searchTitle, (data)=>{
        res.send(data);
    });
    
});

//add film
router.post('/films/new/',adminJWT, (req,res)=> {
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
router.put('/films/:id',adminJWT, (req,res)=>{
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
router.delete('/films/:id',adminJWT, (req,res)=>{

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