const axios=require('axios')
const {Promise}=require('bluebird')
const {API_KEY}=require('../../db.js')
const {Videogame}=require('./../../db')


async function videogames(req,res){
    const {name}=req.query
    if(!name){// busqueda sin argumentos
        const query=[]
        Promise.each([
            Videogame.findAll().catch(e=> res.status(404).send(e.message)),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then(response=>response.data.results).catch(e=> res.status(404).send(e.message))
        ],()=>{})
        .then(arrQuery=> arrQuery.forEach(e=> e.forEach(e=>query.push({image:e.background_image||e.image,name:e.name, id: e.id}))))
        .then(()=> res.send(query)).catch(e=> res.status(404).send(e.message))
    }
    if(name){//busqueda con el argumento '?name=""'
        
        const query=[]
        let filtered
        Promise.each([
            Videogame.findAll({where:{name:name}})
            .then(response=>{
                const newResponse=response.map(e=>e.dataValues)
                return newResponse
            }),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`).then(response=>response.data.results).catch(e=>console.log(e))

        ],()=>{})
        .then(arrQuery=> {
            arrQuery.forEach(e=>e.forEach(e=>query.push({image:e.background_image,id:e.id,name:e.name})))
            filtered=query.filter((e,i)=>i<15)
            res.send(filtered)
        })
        .catch(e=>res.status(404).send(e.message))    
        
    }
 
}



module.exports={
    videogames
}