const axios=require('axios')
const {Promise}=require('bluebird')
const {API_KEY}=require('../../db.js')
const {Videogame}=require('./../../db')
const {Op}=require('sequelize')


async function videogames(req,res){
    const {name}=req.query
    if(!name){// busqueda sin argumentos
        const list=[]
        const query=[]
        Promise.each([
            Videogame.findAll().catch(e=> res.status(404).send(e.message)),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then(response=>response.data.results).catch(e=> res.status(404).send(e.message))
        ],()=>{})
        .then(arrQuery=> {arrQuery.forEach(e=> e.forEach(e=>{
            query.push({image:e.background_image||e.image,name:e.name, id: e.id})
            if(e.id.length)list.push(e.name)
        }))
        res.send({query,list})
        })
        .catch(e=> res.status(404).send(e.message))
    }
    if(name){//busqueda con el argumento '?name=""'
        const list=[]
        let query=[]
       
        Promise.each([
            Videogame.findAll({where:{name:{[Op.iLike]: `%${name}%`}}})
            .then(response=>{
                const newResponse=response.map(e=>e.dataValues)
                return newResponse
            }),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`).then(response=>response.data.results).catch(e=>console.log(e))

        ],()=>{})
        .then(arrQuery=> {
            arrQuery.forEach(e=>e.forEach(e=>{
                query.push({image:e.background_image||e.image,id:e.id,name:e.name})   
                if(e.id.length)list.push(e.name)
            }
            ))
            query=query.filter((e,i)=>i<15)
            res.send({query,list})
        })
        .catch(e=>res.status(404).send(e.message))    
        
    }
 
}



module.exports={
    videogames
}