const {API_KEY}=require('../../db.js')
const axios= require('axios')
const {Genre}= require('./../../db')

 function genres(req, res){

   Genre.findAll()
   .then(response=> res.sen(response))
   .catch(e=> res.status(404).send(e.message))
    
}

function genresGames(req,res){
    const {id}=req.params
    Genre.findByPk(id)
    .then(e=>e.getVideogames(e))
    .then(response=>{
        res.send(response)
    })
    .catch(e=>res.status(404).send(e.message))

}

module.exports={
    genres,
    genresGames
}