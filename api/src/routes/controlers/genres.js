const {API_KEY}=require('../../db.js')
const axios= require('axios')
const {Genres}= require('./../../db')

async function genres(req, res){

   const listGenres=await Genres.findAll()
    
    res.send(
        listGenres
    )
}


module.exports={
    genres,

}