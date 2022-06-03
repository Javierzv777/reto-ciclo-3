import myGamesStyle from './myGames.module.css';
import {connect} from 'react-redux'
import {reverseFn,getGame, deleteGame, saveGame,getGames, clearList,startLoading,updateRating,setGames,sortByName,sortByRating} from '../actions/actions'
import { useHistory} from 'react-router-dom'
import SearchBar from './searchBar';
import stars from './../cincoEstrellas.png'
import {useState} from 'react'





function MyGames(props) {
  let flag=false;
  flag=((props.saved.length^props.flag)&&props.games.length) 
  const [qualify,setQualify]=useState({flag:false, rating:0, id:null})
  const[sort,setSort]=useState('ordenar por rating')
  const [reverse,setReverse]=useState('Descendente')
 
  const sortBy=()=>{
   if(sort==='ordenar por rating'){
     props.sortByRating()
     setSort('ordenar por nombre')
     setReverse('Descendente')
   }
   else{
     props.sortByName()
     setSort('ordenar por rating')
     setReverse('Descendente')
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
 let history=useHistory()
//  useEffect(()=>{
//   return ()=>{
//   console.log('unmounted')  
//     props.setGames()
//   }
//   },[])

  const handleQualify=(id)=>{
    setQualify({
      flag:true,
      id
    })
  }
  const handleQualifyCancel=()=>{
    setQualify({
      flag:false,
      id:null,
      rating:0
    })
  }
  const handleQualifyUpdate=()=>{
    props.updateRating(qualify.id,qualify.rating)
    .then(()=>{
      setQualify({
        flag:false,
        id:null,
        rating:0
      })
    })
  
  }
  const handleOnChange=(e)=>{
    
    setQualify({...qualify,rating:parseInt(e.target.value)})
  }
  const handleOnClick=(id)=>{
    props.getGame(id)
    history.push("/videogame/detail")
  }
  const handleDelete=(id,name)=>{
    props.deleteGame(id)
  }
  const handleUpdate=(id)=>{
    props.getGame(id)
    history.push("/videogame/Update")
  }
  const handleSubmit=function(gameName){
    props.getGames(gameName)
    props.startLoading()
  }
    return (

        <div className={myGamesStyle.container}>
          <span className={myGamesStyle.searchBar}>
            <SearchBar
                handleSubmit={handleSubmit}
                searchButton={'Buscar'} 
                placeHolder={'...Buscar Juegos en db'}
            />
         </span>

          {qualify.flag&&(
            <div className={myGamesStyle.qualify}>
              
                <div className={myGamesStyle.starsRate}
                 onChange={(e)=>handleOnChange(e)}
                 >
                  <div className={myGamesStyle.starsRateInputs}>
                    <label  >1.</label>
                    <input type="radio" value="1" name="rate" id="rate-5" />
                    <label  >2.</label>
                    <input type="radio" value="2" name="rate" id="rate-4" />
                    <label  >3.</label>
                    <input type="radio" value="3" name="rate" id="rate-3" />
                    <label  >4.</label>
                    <input type="radio" value="4" name="rate" id="rate-2" />
                    <label  >5.</label>
                    <input type="radio" value="5" name="rate" id="rate-1" />
                  </div>
                  <div className={myGamesStyle.buttonInputRadio}>
                      <button onClick={()=>handleQualifyCancel()} 
                      >
                        Cancelar
                      </button>
                      <button onClick={()=> handleQualifyUpdate()}
                      >
                        Calificar
                      </button>
                    </div>

                </div>
            </div>
          )}
          <div className={myGamesStyle.games}>
            {props.loading===true&&(<div className={myGamesStyle.loading}></div>)}
              {(flag!==0||props.platform||props.genre)&&(<div className={myGamesStyle.sortBy}>
                <button
                onClick={()=>sortBy()}
                >{sort}</button></div>)}
                {(flag!==0||props.platform||props.genre)&&(<div className={myGamesStyle.sortBy}>
                <button
                onClick={()=>sortReverse()}
                >{reverse}</button></div>)}
              {props.platform&&(<div className={myGamesStyle.title}>{props.platform}</div>)}
              {props.genre&&(<div className={myGamesStyle.title}>{props.genre}</div>)}
              {!props.genre&&!props.platform&&flag!==0&&(<div className={myGamesStyle.title}>Lista de Videojuegos</div>)}
              <div className={myGamesStyle.containerCards}>
              {props.games.map((e,i)=>{
                  return(e.id.length) &&(
                      <div key={i}>
                        <div className={myGamesStyle.card} 
                          >
                          <div className={myGamesStyle.subtitle}>
                            <span>{e.name}</span>
                              <div className={myGamesStyle.subtitle}>
                                <div className={myGamesStyle.score}>{e.rating}</div>
                                <div className={myGamesStyle.stars}>
                                  <div style={!e.rating?{width:`0%`}:{width:`calc(20% * ${e.rating})`}}></div>
                                  <img src={stars} alt={e.rating} title={e.rating}/>
                                </div>
                            </div>
                          </div>
                          <img onClick={()=>handleOnClick(e.id)}
                          className={myGamesStyle.image} src={e.image} alt={e.name}>
                          </img>
                        </div>
                        <div>
                          {e.id&&e.id.length&&(
                          <div className={myGamesStyle.button}>
                            <button onClick={()=> handleUpdate(e.id,e.name)}>
                              Editar
                            </button>
                            <button onClick={()=>handleQualify(e.id)} 
                            >
                              calificar
                            </button>
                            <button onClick={()=> handleDelete(e.id,e.name)}
                            >
                              Eliminar
                            </button>
                          </div>
                          )}
                          
                        </div>
                        
                      </div>
                  )
              })}
              </div>
          </div>      
        </div>

    )

}

export function mapStateToProps(state) {
    return {
      games: state.games,
      game: state.game,
      saved: state.savedGames,
      flag:state.flag,
      platform:state.platform,
      genre:state.genre,
      loading:state.loadingFlag,

    };
  }
  
  export function mapDispatchToProps(dispatch) {
    return {
      deleteGame:(id)=>dispatch(deleteGame(id)),
      getGame: (m) =>dispatch(getGame(m)),
      saveGame: (id)=>dispatch(saveGame(id)),
      getGames: (id)=>dispatch(getGames(id)),
      clearList: ()=> dispatch(clearList()),
      startLoading:()=>dispatch(startLoading()),
      updateRating:(id,rating)=>dispatch(updateRating(id,rating)),
      setGames:()=>dispatch(setGames()),
      sortByName:()=>dispatch(sortByName()),
      sortByRating:()=>dispatch(sortByRating()),
      reverseFn:()=>dispatch(reverseFn())
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(MyGames)