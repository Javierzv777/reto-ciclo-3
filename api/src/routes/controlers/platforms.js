const axios=require('axios')
const {Videogame, Platforms}=require('./../../db')

 function platforms(req,res){
    let {IdGame}=req.query
    if(!IdGame){
        res.status(500).res('no hay plataformas que mostrar')
    }else{
        let game=Videogame.findByPk(IdGame)
        let platforms=game.getPlatforms()
        res.send(platforms)
    }
}

module.exports={
    platforms
}