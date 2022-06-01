const {Videogame, Rating}=require('../../db')

function setScore(req,res){
    console.log('score');
    const {score,id}=req.query
    const game= Videogame.findByPk(id)
    .then((response)=>{
       return response.createRating({ score }) 
    })
    .then(e=> res.send(score))
    .catch(e=> res.status(404).send(score))
    
  
}

module.exports={
    setScore
}