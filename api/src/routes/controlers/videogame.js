const {API_KEY, Genre}=require('../../db.js')
const axios=require ('axios')
const locaGames=require('./../../../localVideogames')
const { genres } = require('./genres.js')

async function Videogame(req,res){
    
    const {idVideogame}=req.params
    if(!idVideogame){
      
        res.status(404).send('no has asignado un id para la busqueda de un videogame')
    
    }
    if(idVideogame){
        try{
            let query
            const param=await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`).then(response=>response.data).catch(e=>console.log(e))
            
           console.log(param)
            // let filtered=query.results.filter((e,i)=>i<15)
            // let list=filtered.map(e=>e.name)
            res.send({name:param.name,
                description:param.description}) 
        }catch(e){
            res.status(404).send(e.message)
        }
    }
}

async function createVideogame(req,res){
    const {genero,nombre,descripcion, plataformas, }=req.body
    let genre=await Genre.findByPk(genero)
    genre.createVideogame({
        nombre,
        descripcion,
        plataformas
    })
    res.send('videogame')
}

function deleteVideogame(req,res){
    res.send('')
}
function updateVideogame(req,res){
    res.send('')
}
module.exports={
    Videogame,
    createVideogame,
    deleteVideogame,
    updateVideogame
}