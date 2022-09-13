const express = require('express');
const mysql = require('mysql');

//create database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sakila'
})



let actorRepo={
    get: (resolve, reject)=>{
      
        //let sql = "SELECT first_name, last_name FROM `actor` WHERE first_name LIKE '%cha%' OR last_name LIKE '%cha%'";
        let sql = 'SELECT * FROM actor LIMIT 5';
        db.query(sql, (err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data)
        });
 
    },
    //search actor
    searchFirstName: (searchActor, resolve, reject) =>{

        let sql = "SELECT first_name, last_name FROM `actor` WHERE first_name LIKE '%"+searchActor.actor+"%'";
        db.query(sql, function(err,data){
            if(err){
                reject(err);
            }
            console.log(sql);
            resolve(data);
        });      
    },
    searchLastName: (searchActor, resolve, reject) =>{

        let sql = "SELECT first_name, last_name FROM `actor` WHERE last_name LIKE '%"+searchActor.actor+"%'";
        db.query(sql, (err,data) =>{
            if(err){
                reject(err);
            }
            console.log(sql);
            resolve(data);
        });      
    },

    //add actor
    addActor:(newActor, resolve, reject)=>{

        let sql = "INSERT INTO actor SET ?";
        db.query(sql,newActor, (err,data) =>{
            if(err){
                reject(err);
            }
            //console.log(sql);
            resolve(data);
        });      
    },

    //update actor
    updateActor:(newActor, id, resolve, reject)=>{

        let sql = "UPDATE actor SET ? WHERE actor_id = ?";
        db.query(sql, [newActor, id], (err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
           
        })
    },

    //delete actor
    deleteActor:(id, resolve, reject)=>{

        let sql = "DELETE FROM actor WHERE actor_id = ?";
        db.query(sql, id, (err, data)=>{
            if(err){
                reject(err);
            }
            resolve(data);
        })
    },
}

module.exports = actorRepo