const {API_KEY}=require('../../db.js')
const axios= require('axios')
const {Genre}= require('./../../db')

async function genres(req, res){

   const listGenres=await Genre.findAll()
    
    res.send(
        listGenres
    )
}


module.exports={
    genres,

}