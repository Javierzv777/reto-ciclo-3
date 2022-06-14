import GamesStyle from './showGames.module.css';
import {connect} from 'react-redux'
import {reverseFn ,sortByName,sortByRating,getGame,saveGame,deleteGame, clearList,setGames,setPages,setShowGames} from '../actions/actions'
import { useHistory} from 'react-router-dom'
import stars from './../cincoEstrellas.png'
import {useState,useEffect} from 'react'



function ShowGames(props) {


  

  let history=useHistory()

  const[sort,setSort]=useState('Order by rating')
  const [reverse,setReverse]=useState('Downward')
  const [gamesToShow,setGamesToShow]=useState({flag:'all', message:'Showing all games'})

 


  useEffect(()=>{
    
    if(props.showGames.length===0){
      handleOnChangePages('1')
    }

    return ()=>{return props.setGames}
  },[props.games])




  const handleOnChangePagesArrow=(e)=>{
    
    if(props.pages==='1'&&e==='back') return
    if(props.pages==='7'&&e==='foward') return
    if(e==='back'){
      
      let number=Number(props.pages)
      number--
      handleOnChangePages(number.toString())
    }
    if(e==='foward'){
     
      let number=Number(props.pages)
      number++
      handleOnChangePages(number.toString())
    }
  }
  const handleOnChangePages=(e)=>{
    switch(e){
      case '1': props.setPages('1') 
      return props.games.length>0&&props.setShowGames([...props.games.filter((e,i)=>i>=0&&i<15)])
      case '2': props.setPages('2'); 
      return props.games.length>20&&props.setShowGames([...props.games.filter((e,i)=>i>=15&&i<30)])
      case '3': props.setPages('3'); 
      return props.games.length>40&&props.setShowGames([...props.games.filter((e,i)=>i>=30&&i<45)])
      case '4': props.setPages('4')
      return props.games.length>60&&props.setShowGames([...props.games.filter((e,i)=>i>=45&&i<60)])
      case '5': props.setPages('5') 
      return props.games.length>80&&props.setShowGames([...props.games.filter((e,i)=>i>=60&&i<75)])
      case '6': props.setPages('6') 
      return props.games.length>80&&props.setShowGames([...props.games.filter((e,i)=>i>=75&&i<90)])
      case '7': props.setPages('7') 
      return props.games.length>80&&props.setShowGames([...props.games.filter((e,i)=>i>=90&&i<105)])
      
      default: return 
    }
  }
  const changeBottonGamesToShow=()=>{
    if(gamesToShow.flag==='all'){
      setGamesToShow({flag:'api',message:'Showing api games'})
      return
    }
    if(gamesToShow.flag==='api'){
      setGamesToShow({flag:'db',message:'Showing saved games'})
      return
    }
    if(gamesToShow.flag==='db'){
      setGamesToShow({flag:'all',message:'Showing all games'})
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
   if(sort==='Order by rating'){
     props.sortByRating()
     handleOnChangePages('1')
     setSort('Order by name')
     setReverse('Downward')
   }
   else{
     props.sortByName()
     handleOnChangePages('1')
     setSort('Order by rating')
     setReverse('Downward')
   }
 }
 const sortReverse=()=>{
  if(reverse==='Upward'){
    props.reverseFn()
    handleOnChangePages('1')
    setReverse('Downward')
  }
  else{
    props.reverseFn()
    handleOnChangePages('1')
    setReverse('Upward')
  }
  }
  const handleOnClick=(id)=>{
    props.getGame(id)
    history.push("/detail")
  }
  const handleDelete=(id,name)=>{
    props.deleteGame(id)
    // handleOnChangePages('1')
  
  }
  const handleSave=(id)=>{
    props.saveGame(id)
  }

   
    return (
        <div className={GamesStyle.games}>
            {props.loading===true&&(<div className={GamesStyle.loading}></div>)}
            {props.showGames.length>0&&(<div className={GamesStyle.sortBy}>
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
            {props.showGames.length>0&&(<div className={GamesStyle.title}>Videogames List</div>)}

            { props.showGames.length>0&&<div 
              className={GamesStyle.searchBarPagesFirst}>
              <label onClick={()=>handleOnChangePagesArrow('back')}> {`<<-  `} </label>
              <label  >1.</label>
              <input type="radio" value="1" name="rate" id="rate-5" checked={props.pages === '1'}
              onChange={(e)=>handleOnChangePages(e.target.value)}
              />
              <label  >2.</label>
              <input type="radio" value="2" name="rate" id="rate-4" checked={props.pages === '2'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >3.</label>
              <input type="radio" value="3" name="rate" id="rate-3" checked={props.pages === '3'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >4.</label>
              <input type="radio" value="4" name="rate" id="rate-2" checked={props.pages === '4'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >5.</label>
              <input type="radio" value="5" name="rate" id="rate-1" checked={props.pages === '5'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >6.</label>
              <input type="radio" value="6" name="rate" id="rate-1" checked={props.pages === '6'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label  >7.</label>
              <input type="radio" value="7" name="rate" id="rate-1" checked={props.pages === '7'}
              onChange={(e)=>handleOnChangePages(e.target.value)}/>
              <label onClick={()=>handleOnChangePagesArrow('foward')}>{`  ->>`}</label>
            </div>}
            <div className={GamesStyle.container}>
            {props.showGames.length>0&&props.showGames.map((e,i)=>{
                return(props.showGames)&&gamesToShowFn(e.id)&&(
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
                      <div className={GamesStyle.buttonsToShow}>
                        {e.id&&e.id.length&&(<button onClick={()=> handleDelete(e.id,e.name)}
                        className={GamesStyle.buttonDelete}>
                          Delete Game
                        </button>)}
                        {e.id&&!e.id.length&&(<button onClick={()=> handleSave(e.id,i)}
                        className={GamesStyle.button}>
                          Save Game
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
      loading: state.loadingFlag,
      pages:state.pages,
      showGames: state.showGames
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
      reverseFn:()=>dispatch(reverseFn()),
      setPages: (num)=>dispatch(setPages(num)),
      setShowGames:(arr)=>dispatch(setShowGames(arr))
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(ShowGames)