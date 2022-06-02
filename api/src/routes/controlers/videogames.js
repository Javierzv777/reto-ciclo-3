const axios=require('axios')
const {Promise}=require('bluebird')
const {API_KEY}=require('../../db.js')
const {Videogame}=require('./../../db')
const {Op}=require('sequelize')


async function videogames(req,res){
    const {name}=req.query
    let list=[]
    let query=[]
    let listName=[]
    if(!name){// busqueda sin argumentos
        
        Promise.each([
            Videogame.findAll().catch(e=> {throw Error(e.message)}),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`).then(response=>response.data.results).catch(e=> res.status(404).send(e.message))
        ],()=>{})
        .then(arrQuery=> {
            arrQuery[0].forEach(e=>{
                query.push({image:e.image,name:e.name, id: e.id,rating:e.score})
                listName.push(e.name)
            })
            arrQuery[1].forEach(e=>{
                if(listName.includes(e.name)){
                    list.push({id:e.id,name:e.name})
                }else{
                    query.push({image:e.background_image,name:e.name, id: e.id,rating:e.rating})
                }
            })
        res.send({query,list})
        })
        .catch(e=> res.status(404).send(e.message))
    }
    if(name){//busqueda con el argumento '?name=""'
       
       
        Promise.each([
            Videogame.findAll({where:{name:{[Op.iLike]: `%${name}%`}}})
            .then(response=>{
                const newResponse=response.map(e=>e.dataValues)
                return newResponse
            }),
            axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`).then(response=>response.data.results).catch(e=>console.log(e))

        ],()=>{})
        .then(arrQuery=> {
            arrQuery[0].forEach(e=>{
                query.push({image:e.image,id:e.id,name:e.name,rating:e.score})   
                listName.push(e.name)
            })
            arrQuery[1].forEach(e=>{
                if(listName.includes(e.name)){
                    list.push({id:e.id,name:e.name})
                }else{
                    query.push({image:e.background_image,id:e.id,name:e.name,rating:e.rating})
                }            
            })
            query=query.filter((e,i)=>i<15)
            res.send({query,list})
        })
        .catch(e=>res.status(404).send(e.message))    
        
    }
 
}



module.exports={
    videogames
}