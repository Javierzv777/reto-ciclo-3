const { API_KEY, Genre, Platform, Videogame } = require('../../db')
const axios = require('axios')
const { Op } = require("sequelize");


const Genres = require('../../models/Genres.js')
// metodo get
async function videogame(req, res) {// devuelve un videojuego con el id pasado por params
    const { idVideogame } = req.params
    if (!idVideogame) {
        res.status(404).send('no has asignado un id para la busqueda de un videogame')
    }
    if (idVideogame) {
        Promise.any([
            axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`).then(response => response.data)
                .then(e => {
                    return {
                        id: e.id,
                        name: e.name,
                        image:e.background_image,
                        description:e.description,
                        released: e.released,
                        rating: e.rating,
                        platforms: e.platforms.map(e => { return { id: e.platform.id, name: e.platform.name } }),
                        genres: e.genres.map(e => { return { id: e.id, name: e.name } })
                    }
                })
            ,
            Videogame.findAll({
                where: { id: idVideogame },
                include: [
                    
                    {
                        model: Platform,
                        through: { atributes: [] },
                        as:'platforms'
                    },
                    {
                        model: Genre, 
                        through: { atributes: [] },
                        as: 'genres'
                    },
                ]
            })
                .then((response) => {
                    return response[0]
                })
        ])
            .then(element => {
                if (element) {
                    res.send({
                        element
                    })
                }
            })
            .catch(e => res.status(404).send(e.message))


    }
}

//metodo post---crea un videojuego---
async function createVideogame(req, res) {
    const { name, image, description, released, genres, platforms,rating } = req.body
    const [gameCreated, created] = await Videogame.findOrCreate({//crea el juego
        where: { name },// devuelve el juego si ya existe y created sigue en "false"
        defaults: {//crea el juego si no existe y created pasa a "true"
            name,
            description,
            [released&&`released`]:released?released:undefined,
            [image&&`image`]:image?image:undefined,
            [rating&&`rating`]:rating?rating:undefined,
        }
    }).catch(e => res.status(404).send(e.message));
    if (created === false) return res.status(404).send(`el videojuego ${name} ya existe`)

    if (platforms&&platforms.length > 0) {//rectifico si el argumento que recibí como platforms en un arreglo 
        //con elementos
        Promise.all(
            platforms.map((e) => {
                return Platform.findOrCreate({ //creo las plataformas si no existen
                    where: { name: e.name },
                    defaults: { name: e.name }
                })
            }))
                .then((response) => {
                    response.forEach(e=>{
                        e.forEach(e => {
                            Platform.findByPk(e.id)
                                .then(e => gameCreated.addPlatform(e))//agrego las relaciones con las plataformas
                                .catch(e => res.status(404).send(e.message))
                        })

                    })

                }).catch(e => res.status(404).send(e.message))
    }
    const genreNames = genres.map(e => e.name)
    Genre.findAll({//agrego las relaciones de Generos con los juegos
        where: {
            name: { [Op.in]: genreNames }
        }
    })
        .then((response) => {
            response.forEach(e => {
                gameCreated.addGenre(e)
            })
        })
        .catch(e => res.status(404).send(e.message))
    res.status(201).send({name:name, id: gameCreated.id})

}
// delete------elimina un videojuego por id---------------
function deleteVideogame(req, res) {
    const { idVideogame } = req.params
    if (!idVideogame) {
        res.status(404).send('no has asignado un id para eliminar un videogame')
    }
    
    if (idVideogame) {
        Videogame.destroy({
            where:{
                id:idVideogame
            }
        })
        .then(()=>res.send({gameDeleted:idVideogame}))
        .catch(()=>res.status(404).send('no se pudo eliminar el juego'))
    }
}

async function updateVideogame(req, res) {
    const {idVideogame}=req.params
    const {genres, platforms, name, description, rating, released}=req.body
    let game= await Videogame.findByPk(idVideogame)
    if(!game) res.status(404).send('id no encontrado, no se pudo acutalizar los datos')
    await game.set({
        name: name?name:game.name,
        description: description?description:game.description,
        rating: rating?rating:game.rating
      });

     
      if(platforms&&platforms.length){
          await game.setPlatforms([])//reinicio las relaciones
          await Promise.all(
            platforms.map((e) => {
                return Platform.findOrCreate({ //creo las plataformas si no existen
                    where: { name: e.name },
                    defaults: { name: e.name }
                })
            }))
                .then((response) => {
                    response.forEach(e=>{
                            Platform.findByPk(e[0].id)
                                .then(e => game.addPlatform(e))//agrego las relaciones con las plataformas
                                .catch(e => res.status(404).send(e.message))
                        

                    })

                }).catch(e => res.status(404).send(e.message))
      }
      if(genres&&genres.length){
        await game.setGenres([])//reinicio las relaciones
        await Promise.all(
          genres.map((e) => {
              return Genre.findOrCreate({ //creo las plataformas si no existen
                  where: { name: e.name },
                  defaults: { name: e.name }
              })
          }))
              .then((response) => {
                  response.forEach(e=>{
                          Genre.findByPk(e[0].id)
                              .then(e => game.addGenre(e))//agrego las relaciones con las plataformas
                              .catch(e => res.status(404).send(e.message))
                      

                  })

              }).catch(e => res.status(404).send(e.message))
    }
      await game.save()
      res.send(game)
    
}
module.exports = {
    videogame,
    createVideogame,
    deleteVideogame,
    updateVideogame,

}