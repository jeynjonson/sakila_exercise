const express = require('express');
const mysql = require('mysql');

//create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sakila'
})

let filmRepo={
    get: (resolve, reject)=>{
        let sql = 'SELECT * FROM film LIMIT 10';
        db.query(sql, (err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data)
        });
 
    },
    //title
    searchFilmByTitle: (searchTitle, resolve, reject)=>{
        
        let sql = "SELECT title, description, release_year, rating FROM film WHERE title LIKE '%"+searchTitle.title+"%'";
        db.query(sql, (err,data)=>{
            if(err){
                reject(err);
            }
            console.log(sql);
            resolve(data);
        })
    },
    //genre
    searchFilmByGenre: (searchGenre, resolve, reject)=>{

        let sql = "SELECT title, description, release_year, rating, category.name FROM film JOIN film_category AS fc ON film.film_id = fc.film_id JOIN category ON fc.category_id = category.category_id WHERE category.name LIKE '%"+searchGenre.genre+"%'";
        db.query(sql, (err,data)=>{
            if(err){
                reject(err);
            }
            console.log(sql);
            resolve(data);
        })
    },
    //actor
    searchFilmByActor: (searchActor, resolve, reject)=>{
        
        let sql ="SELECT title, description, release_year, rating FROM film JOIN film_actor AS fa ON film.film_id = fa.film_id JOIN actor ON fa.actor_id = actor.actor_id WHERE actor.last_name LIKE '%"+searchActor.name+"%'";
        db.query(sql, (err, data)=>{
            if(err){
                reject(err);
            }
            console.log(sql);
            resolve(data)
        });
 
    },
    //look for availabilty 
    isAvailable: (searchTitle, resolve, reject) => {
        
        let sql ="SELECT film.title,film.description, (SELECT COUNT(DISTINCT inventory.inventory_id))- (SELECT COUNT(DISTINCT inventory.inventory_id) FROM film LEFT JOIN inventory ON film.film_id = inventory.film_id LEFT JOIN rental ON inventory.inventory_id = rental.inventory_id WHERE film.title LIKE '%"+searchTitle.title+"%' AND rental.return_date IS NULL GROUP BY inventory.film_id) AS available FROM film LEFT JOIN inventory ON film.film_id = inventory.film_id WHERE film.title LIKE '%"+searchTitle.title+"%';"
        db.query(sql, (err, data)=>{
            if(err){
                reject(err);
            }
            console.log(sql);
            resolve(data)
        });
 
    },

    //CRUD - R 
    //Add film
    addFilm:(newFilm, resolve, reject)=>{

        let sql = "INSERT INTO film SET ?";
        db.query(sql,newFilm, (err,data) =>{
            if(err){
                reject(err);
            }
            console.log(sql);
            resolve(data);
        });      
    },

    //Update film
    updateFilm: (newFilm, id, resolve, reject)=>{

        let sql = "UPDATE film SET ? WHERE film_id = ?";
        db.query(sql, [newFilm, id], (err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        });
    },

    //Delete film
    deletFilm:(id, resolve, reject)=>{

        let sql = "DELETE FROM film WHERE film_id = ?";
        db.query(sql, id, (err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    },
}

module.exports = filmRepo