import GamesStyle from './showGames.module.css';
import {connect} from 'react-redux'
import {reverseFn ,sortByName,sortByRating,getGame,saveGame,deleteGame, clearList,setGames} from '../actions/actions'
import { useHistory} from 'react-router-dom'
import stars from './../cincoEstrellas.png'
import {useState,useEffect} from 'react'



function ShowGames(props) {


  

  let history=useHistory()

  const[sort,setSort]=useState('ordenar por rating')
  const [reverse,setReverse]=useState('Descendente')
  const [gamesToShow,setGamesToShow]=useState({flag:'all', message:'mostrando todos los juegos'})
  const [Games, setGames]=useState({ showGames:[]})
  const [page, setPage]=useState('1')
 


  useEffect(()=>{
    setGames({showGames:props.games.filter((e,i)=>i>=0&&i<15)})
    handleOnChangePages('1')
    return ()=>{return props.setGames}
  },[props.games,props.setGames])


  const handleOnChangePagesArrow=(e)=>{
    
    if(page==='1'&&e==='back') return
    if(page==='7'&&e==='foward') return
    if(e==='back'){
      
      let number=Number(page)
      number--
      handleOnChangePages(number.toString())
    }
    if(e==='foward'){
     
      let number=Number(page)
      number++
      handleOnChangePages(number.toString())
    }
  }
  const handleOnChangePages=(e)=>{
    switch(e){
      case '1': setPage('1') 
      return setGames({showGames:props.games.filter((e,i)=>i>=0&&i<15)})
      case '2': setPage('2') 
      return props.games.length>20&&setGames({showGames:props.games.filter((e,i)=>i>=15&&i<30)})
      case '3': setPage('3')
      return props.games.length>40&&setGames({showGames:props.games.filter((e,i)=>i>=30&&i<45)})
      case '4': setPage('4')
      return props.games.length>60&&setGames({showGames:props.games.filter((e,i)=>i>=45&&i<60)})
      case '5': setPage('5') 
      return props.games.length>80&&setGames({showGames:props.games.filter((e,i)=>i>=60&&i<75)})
      case '6': setPage('6') 
      return props.games.length>80&&setGames({showGames:props.games.filter((e,i)=>i>=75&&i<90)})
      case '7': setPage('7') 
      return props.games.length>80&&setGames({showGames:props.games.filter((e,i)=>i>=90&&i<105)})
      
      default: return 
    }
  }
  const changeBottonGamesToShow=()=>{
    if(gamesToShow.flag==='all'){
      setGamesToShow({flag:'api',message:'mostrando juegos de la red'})
      return
    }
    if(gamesToShow.flag==='api'){
      setGamesToShow({flag:'db',message:'mostrando juegos guardados'})
      return
    }
    if(gamesToShow.flag==='db'){
      setGamesToShow({flag:'all',message:'mostrando todos los juegos'})
      return
    }
  }
  const gamesToShowFn=(id)=>{
    if(gamesToShow.flag==='all'){
      return true
    }
    if(gamesToShow.flag==='db'){
      if(typeof id==='string'){
        return true
      }
    }
    if(gamesToShow.flag==='api'){
      if(typeof id ==='number'){
        return true
      }
    }
    return false
  }
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
  const handleOnClick=(id)=>{
    props.getGame(id)
    history.push("/detail")
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
            {Games.showGames.length>0&&(<div className={GamesStyle.sortBy}>
                <button
                onClick={()=>sortBy()}
                >{sort}</button>
                <button
                onClick={()=>sortReverse()}
                >{reverse}</button>
                <button
                onClick={()=>changeBottonGamesToShow()}
                >{gamesToShow.message}</button>
              </div>)}
            {Games.showGames.length>0&&(<div className={GamesStyle.title}>Lista de Videojuegos</div>)}

            { Games.showGames.length>0&&<div 
              className={GamesStyle.searchBarPagesFirst}>
              <label onClick={()=>handleOnChangePagesArrow('back')}> {`<<-  `} </label>
              <label  >1.</label>
              <input type="radio" value="1" name="rate" id="rate-5" checked={page === '1'}
              onChange={(e)=>handleOnChangePages(e.target.value)}
              />
              <label  >2.</label>
              <input type="radio" value="2" name="rate" id="rate-4" checked={page === '2'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >3.</label>
              <input type="radio" value="3" name="rate" id="rate-3" checked={page === '3'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >4.</label>
              <input type="radio" value="4" name="rate" id="rate-2" checked={page === '4'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >5.</label>
              <input type="radio" value="5" name="rate" id="rate-1" checked={page === '5'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >6.</label>
              <input type="radio" value="6" name="rate" id="rate-1" checked={page === '6'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >7.</label>
              <input type="radio" value="7" name="rate" id="rate-1" checked={page === '7'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label onClick={()=>handleOnChangePagesArrow('foward')}>{`  ->>`}</label>
            </div>}
            <div className={GamesStyle.container}>
            {Games.showGames.length>0&&Games.showGames.map((e,i)=>{
                return(Games.showGames)&&gamesToShowFn(e.id)&&(
                    <div className={GamesStyle.cardContainer}
                      key={i}>
                      <div className={GamesStyle.card} 
                        >
                        <div className={GamesStyle.subtitle}>
                          <span>{e.name}</span>
                          <div className={GamesStyle.subtitle}> 
                            <div className={GamesStyle.genres}>
                              <ul>
                                {e.genres&&e.genres.map((e,i)=>{
                                  return(<li key={i}>
                                    {e.name}
                                    </li>)
                                })}
                              </ul>
                            </div>
                            <span className={GamesStyle.starsContainer}>
                              <div className={GamesStyle.score}>{e.rating}
                              </div>
                              <div className={GamesStyle.stars}>
                                <div style={{width:e.rating===0?'0%':`calc(20% * ${e.rating})`}}></div>
                                <img src={stars} alt={e.rating} title={e.rating}/>
                              </div>
                            </span>
                          </div>
                          
                        </div>
        
                        <img onClick={()=>handleOnClick(e.id)}
                        className={GamesStyle.image} src={e.image} alt={e.name}>
                        </img>   
                      </div>
                      <div>
                        {e.id&&e.id.length&&(<button onClick={()=> handleDelete(e.id,e.name)}
                        className={GamesStyle.buttonDelete}>
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
              {/* { Games.showGames.length>0&&<div onChange={(e)=>handleOnChangePages(e)}
                className={GamesStyle.searchBarPagesLast}>
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
              </div>} */}
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