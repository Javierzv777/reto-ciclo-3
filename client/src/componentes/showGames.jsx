import GamesStyle from './showGames.module.css';
import {connect} from 'react-redux'
import {reverseFn ,sortByName,sortByRating,getGame,saveGame,deleteGame, clearList,setGames} from '../actions/actions'
import { useHistory} from 'react-router-dom'
import stars from './../cincoEstrellas.png'
import {useState} from 'react'



function ShowGames(props) {



  let history=useHistory()

  const[sort,setSort]=useState('ordenar por rating')
  const [reverse,setReverse]=useState('Descendente')
 
  const sortBy=()=>{
   if(sort==='ordenar por rating'){
     props.sortByRating()
     setSort('ordenar por nombre')
     setReverse('descendente')
   }
   else{
     props.sortByName()
     setSort('ordenar por rating')
     setReverse('descendente')
   }
 }
 const sortReverse=()=>{
  if(reverse==='Ascendente'){
    props.reverseFn()
    setReverse('Descendente')
  }
  else{
    props.reverseFn()
    setReverse('Ascendente')
  }
  }
  const handleOnClick=(id)=>{
    props.getGame(id)
    history.push("/videogame/detail")
  }
  const handleDelete=(id,name)=>{
    props.deleteGame(id)
  }
  const handleSave=(id)=>{
    props.saveGame(id)
  }

   
    return (
        <div className={GamesStyle.games}>
            {props.loading===true&&(<div className={GamesStyle.loading}></div>)}
            {props.games[0]&&(<div className={GamesStyle.sortBy}>
                <button
                onClick={()=>sortBy()}
                >{sort}</button></div>)}
                {props.games[0]&&(<div className={GamesStyle.sortBy}>
                <button
                onClick={()=>sortReverse()}
                >{reverse}</button></div>)}
            {props.games[0]&&(<div className={GamesStyle.title}>Lista de Videojuegos</div>)}
            <div className={GamesStyle.container}>
            {props.games.map((e,i)=>{
                return(props.games) &&(
                    <div className={GamesStyle.cardContainer}
                      key={i}>
                      <div className={GamesStyle.card} 
                        >
                        <div className={GamesStyle.subtitle}>
                          <span>{e.name}</span>
                          <div className={GamesStyle.subtitle}>
                            <div className={GamesStyle.score}>{e.rating}</div>
                            <div className={GamesStyle.stars}>
                              <div style={{width:e.rating===0?'0%':`calc(20% * ${e.rating})`}}></div>
                              <img src={stars} alt={e.rating} title={e.rating}/>
                            </div>
                          </div>
                          
                        </div>
        
                        <img onClick={()=>handleOnClick(e.id)}
                        className={GamesStyle.image} src={e.image} alt={e.name}>
                        </img>   
                      </div>
                      <div>
                        {e.id&&e.id.length&&(<button onClick={()=> handleDelete(e.id,e.name)}>
                          Eliminar
                        </button>)}
                        {e.id&&!e.id.length&&(<button onClick={()=> handleSave(e.id,i)}
                        className={GamesStyle.button}>
                          Guardar
                        </button>)}
                      </div> 
                  </div>
                )
            })}
            </div>
        </div>
    )

}

export function mapStateToProps(state) {
    return {
      games: state.games,
      game: state.game,
      saved: state.savedGames,
      loading: state.loadingFlag
    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      deleteGame:(id)=>dispatch(deleteGame(id)),
      getGame: (m) =>dispatch(getGame(m)),
      saveGame: (id)=>dispatch(saveGame(id)),
      clearList: ()=>dispatch(clearList()),
      setGames: ()=>dispatch(setGames()),
      sortByName:()=>dispatch(sortByName()),
      sortByRating:()=>dispatch(sortByRating()),
      reverseFn:()=>dispatch(reverseFn())
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ShowGames)