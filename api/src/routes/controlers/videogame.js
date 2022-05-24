const {API_KEY, Genre, Platform,Videogame}=require('../../db')
const axios=require ('axios')
const { Op } = require("sequelize");


const Genres = require('../../models/Genres.js')

async function videogame(req,res){

    const {idVideogame}=req.params
    if(!idVideogame){
        res.status(404).send('no has asignado un id para la busqueda de un videogame') 
    }
    if(idVideogame){
        Promise.any([
            axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`).then(response=>response.data)
            .then(e=>{
                return{
                    id:e.id,
                    name:e.name,
                    released:e.released,   
                    rating:e.rating,
                    Platforms:e.platforms.map(e=>{return {id:e.platform.id,name:e.platform.name}})  ,
                    Genres:e.genres.map(e=>{return {id:e.id,name:e.name}})            
                }
            })
            ,
             Videogame.findAll({
                where:{id:idVideogame},
                include: [
                    {model: Platform, 
                    through:{atributes:[]}},
                    {model: Genre, 
                        through:{atributes:[]}},
                          ]         
            },)
            .then((response)=>{
                return response
            })
        ])
        .then(element=> {
            if(element){
                res.send({
                    id:element.id,
                    name:element.name,
                    released:element.released,   
                    rating:element.rating,
                    platforms:element.Platforms ,
                    genres:element.Genres          
                })
            }            
        })
        .catch(e=>res.status(404).send(e.message))
        

    }
}
// ID: * No puede ser un ID de un videojuego ya existente en la API rawg
// Nombre *
// Descripción *
// Fecha de lanzamiento
// Rating
// Plataformas *

async function createVideogame(req,res){
    const {name,description,released,genres, platforms, }=req.body
    const [ gameCreated,exists]= await Videogame.findOrCreate({
        where: { name },
        defaults: {
          name, description,released
        }
      }).catch(e=>res.status(404).send(e.message) );
    if(typeof exists==="string") res.status(404).send(`el videojuego ${name} ya existe`)
    
    if(platforms.length>0){

      

        Promise.all(  platforms.map( (e)=>{
            return Platform.findOrCreate({
                where: {name:e.name},
                defaults:{name:e.name}
            })
        }))
        .then((response)=>{
         
         response[0].forEach(e=>{
             Platform.findByPk(e.id)
             .then(e=>gameCreated.addPlatform(e))
             .catch(e=> res.status(404).send(e.message))
         })
            
        }).catch(e=> res.status(404).send(e.message))
    }

   const genreNames= genres.map(e=>e.name)

        Genre.findAll({

            where: {
                name:{ [Op.in]: genreNames}
                 
            }})
      
            .then((response)=> {
               
                response.forEach(e=>{
                    gameCreated.addGenre(e)
                })
            })
            .catch(e=>res.status(404).send(e.message))
    

   res.status(201).send(`el juego "${name} fué creado correctamente"`)
    
}

function deleteVideogame(req,res){
    res.send('')
}
function updateVideogame(req,res){
    res.send('')
}
module.exports={
    videogame,
    createVideogame,
    deleteVideogame,
    updateVideogame,
   
}