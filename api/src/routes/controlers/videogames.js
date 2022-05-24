const axios=require('axios')

const {API_KEY}=require('../../db.js')
const {Videogame}=require('./../../db')


async function videogames(req,res){
    const {name}=req.query
    if(!name){
        const query=[]
        Promise.all([
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then(response=>response.data.results).catch(e=> res.status(404).send(e.message)),
            Videogame.findAll().catch(e=> res.status(404).send(e.message))
        ])
        .then(arrQuery=> arrQuery.forEach(e=> e.forEach(e=>query.push(e.name))))
        .then(()=> res.send(query)).catch(e=> res.status(404).send(e.message))
    }
    if(name){
        
        const query=[]
        let filtered
        Promise.all([
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`).then(response=>response.data.results).catch(e=>console.log(e)),
            Videogame.findAll({where:{name}})
        ])
        .then(arrQuery=> {
            arrQuery.forEach(e=>e.forEach(e=>query.push(e.name)))
            filtered=query.filter((e,i)=>i<15)
            res.send(filtered)
        })
        .catch(e=>res.status(404).send(e.message))    
        
    }
 
}



module.exports={
    videogames
}