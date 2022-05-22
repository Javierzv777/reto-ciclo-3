const axios=require('axios')

const {API_KEY}=require('../../db.js')
const {Videogame}=require('./../../db')


async function videogames(req,res){
    const {name}=req.query
    if(!name){try{
        const query=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then(response=>response.data.results).catch(e=>console.log(e))
        let dbArray=await Videogame.findAll()
        res.send([...dbArray.map(e=>e.name),...query.map(e=>e.name)])

    }catch(e){
        res.status(404).send(e.message)
    }
    }
    if(name){
        try{

            const query=await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`).then(response=>response.data).catch(e=>console.log(e))
            if(query.count===0)res.status(500).send('ningún nombre de videojuego coinsidió con tu búsqueda')
            let filtered=query.results.filter((e,i)=>i<15)
            let dbArray=await Videogame.findAll({where:{name}})
            res.send([...dbArray.map(e=>e.name),...filtered.map(e=>e.name)]) 
        }catch(e){
            res.status(404).send(e.message)
        }
    }

}



module.exports={
    videogames
}