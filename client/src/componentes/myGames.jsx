import myGamesStyle from './myGames.module.css';
import {connect} from 'react-redux'
import {reverseFn,getGame, deleteGame, saveGame,getGames, clearList,startLoading,updateRating,setGames,sortByName,sortByRating} from '../actions/actions'
import { useHistory} from 'react-router-dom'
import SearchBar from './searchBar';
import stars from './../cincoEstrellas.png'
import {useState, useEffect} from 'react'





function MyGames(props) {
  let flag=false;
  flag=((props.saved.length^props.flag)&&props.games.length) 
  const [qualify,setQualify]=useState({flag:false, rating:0, id:null})
  const[sort,setSort]=useState('Order by rating')
  const [reverse,setReverse]=useState('Downward')
 
  const sortBy=()=>{
   if(sort==='Order by rating'){
     props.sortByRating()
     setSort('Order by name')
     setReverse('Downward')
   }
   else{
     props.sortByName()
     setSort('Order by rating')
     setReverse('Downward')
   }
 }
 const sortReverse=()=>{
  if(reverse==='Upward'){
    props.reverseFn()
    setReverse('Downward')
  }
  else{
    props.reverseFn()
    setReverse('Upward')
  }
}
 let history=useHistory()

//  useEffect(()=>{
//   // handleSubmit({data:''})
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
    history.push("/detail")
  }
  const handleDelete=(id,name)=>{
    props.deleteGame(id)
  }
  const handleUpdate=(id)=>{
    props.getGame(id)
    history.push("/videogame/Update")
  }
  const handleSubmit=function(gameName, e){
    e.preventDefault()
    props.getGames(gameName)
    props.startLoading()
  }
    return (

        <div className={myGamesStyle.container}>
          <span className={myGamesStyle.searchBar}>
            <SearchBar
                handleSubmit={handleSubmit}
                searchButton={'Search'} 
                placeHolder={'...Search game in db'}
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
                        Cancel
                      </button>
                      <button onClick={()=> handleQualifyUpdate()}
                      >
                        Qualify
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
                >{sort}</button>
                <button
                onClick={()=>sortReverse()}
                >{reverse}</button></div>)}
              {props.platform&&(<div className={myGamesStyle.title}>{props.platform}</div>)}
              {props.genre&&(<div className={myGamesStyle.title}>{props.genre}</div>)}
              {!props.genre&&!props.platform&&flag!==0&&(<div className={myGamesStyle.title}>Videogames List</div>)}
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
                              Edit
                            </button>
                            <button onClick={()=>handleQualify(e.id)} 
                            >
                              Qualify
                            </button>
                            <button onClick={()=> handleDelete(e.id,e.name)}
                            >
                              X
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